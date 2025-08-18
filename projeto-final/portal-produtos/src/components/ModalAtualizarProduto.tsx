// components/ModalAtualizarProduto.tsx
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Message } from "primereact/message";

import type { ProductRequest } from "../dtos/ProductRequest";
import type { ProductResponse } from "../dtos/ProductResponse";
import useUpdateProduct from "../hooks/UseUpdateProduct";

type Props = {
  visible: boolean;
  product: ProductResponse | null;          // produto que será editado
  onHide: () => void;                       // fechar/cancelar
  onUpdated?: (prod: ProductResponse) => void; // callback após sucesso
};

export default function ModalAtualizarProduto({
  visible,
  product,
  onHide,
  onUpdated,
}: Props) {
  // o hook de atualização — usado DENTRO do modal
  const { triggerUpdate, updatedProduct, loading, error } = useUpdateProduct();

  // form como ProductRequest (sem id)
  const [form, setForm] = useState<ProductRequest | null>(null);
  const [productId, setProductId] = useState<number | null>(null);

  // Ao abrir o modal/sincronizar produto, popular o form e guardar o id
  useEffect(() => {
    if (visible && product) {
      const { id, name, description, price, category, pictureUrl } = product;
      setForm({ name, description, price, category, pictureUrl });
      setProductId(id);
    } else {
      setForm(null);
      setProductId(null);
    }
  }, [visible, product]);

  // Quando atualizar com sucesso: dispara callback opcional e fecha
  useEffect(() => {
    if (updatedProduct) {
      onUpdated?.(updatedProduct);
      onHide();
    }
  }, [updatedProduct, onHide, onUpdated]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!form) return;
    const { name, value } = e.target;
    setForm((prev) =>
      prev ? { ...prev, [name]: name === "price" ? parseFloat(value) || 0 : value } : prev
    );
  };

  const handleSubmit = () => {
    if (!form || productId == null) return;
    triggerUpdate(form, productId);
  };

  const footer = (
    <div className="flex gap-2 justify-end">
      <Button
        type="button"
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-secondary"
        onClick={onHide}
        disabled={loading}
      />
      <Button
        type="button"
        label={loading ? "Atualizando..." : "Atualizar"}
        icon="pi pi-check"
        onClick={handleSubmit}
        disabled={loading || !form?.name}
      />
    </div>
  );

  return (
    <Dialog
      header="Atualizar Produto"
      visible={visible}
      onHide={onHide}
      modal
      blockScroll
      style={{ width: "640px", maxWidth: "95vw" }}
      footer={footer}
    >
      {!form ? (
        <p>Carregando...</p>
      ) : (
        <form className="p-fluid p-formgrid p-grid" onSubmit={(e) => e.preventDefault()}>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="name">Nome</label>
            <InputText id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="price">Preço</label>
            <InputNumber
              inputId="price"
              name="price"
              value={form.price}
              onValueChange={(e) =>
                setForm((prev) => (prev ? { ...prev, price: e.value ?? 0 } : prev))
              }
              mode="currency"
              currency="BRL"
              locale="pt-BR"
              required
            />
          </div>

          <div className="p-field p-col-12">
            <label htmlFor="description">Descrição</label>
            <InputTextarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="category">Categoria</label>
            <InputText
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
            />
          </div>

          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="pictureUrl">URL da Imagem</label>
            <InputText
              id="pictureUrl"
              name="pictureUrl"
              value={form.pictureUrl}
              onChange={handleChange}
            />
          </div>

          {error && (
            <div className="p-col-12">
              <Message severity="error" text={error} />
            </div>
          )}
        </form>
      )}
    </Dialog>
  );
}
