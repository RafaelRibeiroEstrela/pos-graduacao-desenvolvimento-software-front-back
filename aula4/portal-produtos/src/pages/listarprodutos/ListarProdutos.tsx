import { useProducts } from "../../hooks/UseProduct.ts";
import ProductList from "./ProductList.tsx";
import PaginaPadrao from "../../components/PaginaPadrao.tsx";
import { useState } from "react";
import FiltroTexto from "../../components/FiltroTexto.tsx";

function ListarProdutos() {
  const [filtro, setFiltro] = useState<string>("");
  const { products, loading, error } = useProducts(filtro);

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>🔄 Carregando produtos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
        <p>❌ Erro ao carregar produtos:</p>
        <pre>{error}</pre>
      </div>
    );
  }

  return (
    <div>
      <PaginaPadrao></PaginaPadrao>
      <main style={{ padding: "1rem" }}>
        <h3 style={{ marginBottom: "1rem" }}>Catálogo de Produtos</h3>
        <div style={{ marginBottom: "1rem" }}>
          <FiltroTexto
            value={filtro}
            onChange={setFiltro}
            placeholder="Filtrar por id"
            debounceMs={300}
          />
          <div style={{ marginTop: ".5rem", color: "#666" }}>
            {products.length} resultado(s)
          </div>
        </div>
        <ProductList products={products.data} />
      </main>
    </div>
  );
}

export default ListarProdutos;
