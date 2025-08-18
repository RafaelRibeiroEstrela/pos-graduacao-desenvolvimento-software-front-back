// hooks/UseDeleteProduct.ts
import { useEffect, useState } from "react";
import { deleteProduct } from "../controllers/ProductController";

function useDeleteProduct() {
  const [pendingId, setPendingId] = useState<number | null>(null);
  const [deletedId, setDeletedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function triggerDelete(id: number) {
    setPendingId(id);
  }

  useEffect(() => {
    if (pendingId == null) return; // só executa quando alguém chamar triggerDelete

    let cancelled = false;
    setLoading(true);
    setError(null);
    setDeletedId(null);

    deleteProduct(pendingId)
      .then(() => {
        if (!cancelled) setDeletedId(pendingId);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Erro desconhecido ao excluir");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [pendingId]);

  return {
    triggerDelete,
    deletedId,   // <- usamos isso para saber que deu certo
    loading,
    error,
  };
}

export default useDeleteProduct;
