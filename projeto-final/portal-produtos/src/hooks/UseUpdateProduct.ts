import { useEffect, useState } from "react";
import type { ProductRequest } from "../dtos/ProductRequest.ts";
import type { ProductResponse } from "../dtos/ProductResponse.ts";
import { updateProduct } from "../controllers/ProductController.ts";

function useUpdateProduct() {
    const [request, setRequest]         = useState<ProductRequest | null>(null);
    const [id, setId]                   = useState<number>(0);
    const [updatedProduct, setUpdatedProduct] = useState<ProductResponse | null>(null);
    const [loading, setLoading]         = useState(false);
    const [error, setError]             = useState<string | null>(null);

    function triggerUpdate(prod: ProductRequest, id: number) {
        setRequest(prod);
        setId(id);
    }

    useEffect(() => {
        if (!request) return;

        setLoading(true);
        setError(null);

        updateProduct(request, id)
            .then(prod => {
                setUpdatedProduct(prod);
            })
            .catch(err => {
                setError(err.message || "Erro desconhecido ao salvar");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [request]);

    return {
        triggerUpdate,
        updatedProduct,
        loading,
        error,
    };
}

export default useUpdateProduct;
