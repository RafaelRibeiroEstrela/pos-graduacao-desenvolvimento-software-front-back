import { useEffect, useState } from "react";
import type { ProductRequest } from "../dtos/ProductRequest.ts";
import type { ProductResponse } from "../dtos/ProductResponse.ts";
import { deleteProduct } from "../controllers/ProductController.ts";

function useDeleteProduct() {
  const [id, setId] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function triggerDelete(id: number) {
    setId(id);
  }

  useEffect(() => {
    setLoading(true);
    setError(null);

    deleteProduct(id)
      .catch((err) => {
        setError(err.message || "Erro desconhecido ao salvar");
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return {
    triggerDelete,
    loading,
    error,
  };
}

export default useDeleteProduct;
