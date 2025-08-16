// src/pages/produtos/ListarProdutos.tsx
import React, { useMemo, useState } from "react";
import ProductList from "./ProductList";
import PaginaPadrao from "../../components/PaginaPadrao";
import FiltroTexto from "../../components/FiltroTexto";
import { useProducts } from "../../hooks/UseProduct";
import { filterProductsById } from "../../utils/Filter";

export default function ListarProdutos() {
  const [filtroId, setFiltroId] = useState("");
  const { products, loading, error } = useProducts(); // busca tudo uma vez

  // O onChange do FiltroTexto já vem DEPOIS de 500ms (debounce)
  const filtered = useMemo(
    () => filterProductsById(products, filtroId),
    [products, filtroId]
  );

  if (loading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}><p>🔄 Carregando produtos...</p></div>;
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
      <PaginaPadrao />
      <main style={{ padding: "1rem" }}>
        <h3 style={{ marginBottom: "1rem" }}>Catálogo de Produtos</h3>

        <div style={{ marginBottom: "1rem" }}>
          <FiltroTexto
            value={filtroId}
            // força somente números ao salvar o valor debounced
            onChange={(v) => setFiltroId(v.replace(/\D+/g, ""))}
            placeholder="Filtrar por ID (apenas números)"
            debounceMs={500} // redundante, mas explícito
          />
          <div style={{ marginTop: ".5rem", color: "#666" }}>
            {filtered.length} resultado(s)
          </div>
        </div>

        <ProductList products={filtered} />
      </main>
    </div>
  );
}
