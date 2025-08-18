import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import ListarProdutos from '../src/pages/listarprodutos/ListarProdutos';
import type { ProductResponse } from '../src/dtos/ProductResponse';

// 🔧 Mocks para focar só no comportamento da página
jest.mock('../src/pages/produtos/ProductCard.tsx', () => {
  return function MockCard(props: any) {
    const p = props.product;
    return <div data-testid={`card-${p.id}`}>#{p.id} - {p.name ?? p.title ?? ''}</div>;
  };
});

jest.mock('../src/components/PaginaPadrao.tsx', () => {
  return function MockPaginaPadrao() {
    return <div data-testid="pagina-padrao"/>;
  };
});

// Dados que o loader vai "computar"
const PRODUCTS: ProductResponse[] = [
  { id: 1,  name: 'Teclado', price: 100 } as any,
  { id: 2,  name: 'Mouse',   price:  50 } as any,
  { id: 10, name: 'Monitor', price: 900 } as any
];

// Monta um roteador em memória com a rota de produtos e um loader real
function makeRouterWithLoader(data: ProductResponse[]) {
  return createMemoryRouter(
    [{
      path: '/produtos',
      element: <ListarProdutos />,
      loader: async () => {
        // (simula “cálculo” do loader)
        return data.map(p => ({ ...p }));
      }
    }],
    { initialEntries: ['/produtos'] }
  );
}

describe('ListarProdutos – loader + filtragem com debounce 500ms', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('exibe corretamente os dados computados pelo loader', async () => {
    const router = makeRouterWithLoader(PRODUCTS);
    const wrapper = mount(<RouterProvider router={router} />);

    // aguarda o loader ser aplicado e o React renderizar
    await act(async () => { await Promise.resolve(); });
    wrapper.update();

    const cards = wrapper.find('[data-testid^="card-"]');
    expect(cards.length).toBe(3);
    expect(wrapper.text()).toContain('#1 - Teclado');
    expect(wrapper.text()).toContain('#2 - Mouse');
    expect(wrapper.text()).toContain('#10 - Monitor');

    wrapper.unmount();
  });

  it('aplica a filtragem por ID somente após 500ms (debounce)', async () => {
    const router = makeRouterWithLoader(PRODUCTS);
    const wrapper = mount(<RouterProvider router={router} />);

    // espera loader
    await act(async () => { await Promise.resolve(); });
    wrapper.update();

    // input do FiltroTexto
    const input = () => wrapper.find('input[type="text"]').at(0);
    expect(input().exists()).toBe(true);

    // digita "2" – filtro NÃO deve aplicar imediatamente
    input().simulate('change', { target: { value: '2' } });
    expect(wrapper.find('[data-testid^="card-"]').length).toBe(3);

    // avança 500 ms -> dispara o debounce
    await act(async () => {
      jest.advanceTimersByTime(500);
      await Promise.resolve();
    });
    wrapper.update();

    // agora somente o produto ID = 2 deve estar visível
    const cardsApos = wrapper.find('[data-testid^="card-"]');
    expect(cardsApos.length).toBe(1);
    expect(wrapper.text()).toContain('#2 - Mouse');
    expect(wrapper.text()).not.toContain('#1 - Teclado');
    expect(wrapper.text()).not.toContain('#10 - Monitor');

    // (opcional) clicar no botão "Limpar filtro" e verificar a volta da lista
    const clearBtn = wrapper.find('button[aria-label="Limpar filtro"]').at(0);
    if (clearBtn.exists()) {
      clearBtn.simulate('click');
      await act(async () => {
        jest.advanceTimersByTime(500);
        await Promise.resolve();
      });
      wrapper.update();
      expect(wrapper.find('[data-testid^="card-"]').length).toBe(3);
    }

    wrapper.unmount();
  });
});
