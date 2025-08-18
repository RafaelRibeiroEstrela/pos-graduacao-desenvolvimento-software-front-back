import { useEffect, useState } from "react";
import type { ProductRequest } from "../dtos/ProductRequest.ts";
import type { ProductResponse } from "../dtos/ProductResponse.ts";
import { saveProduct } from "../controllers/ProductController.ts";

function useSaveProduct() {
    const [request, setRequest]         = useState<ProductRequest | null>(null);
    const [savedProduct, setSavedProduct] = useState<ProductResponse | null>(null);
    const [loading, setLoading]         = useState(false);
    const [error, setError]             = useState<string | null>(null);

    function triggerSave(prod: ProductRequest) {
        setRequest(prod);
    }

    useEffect(() => {
        if (!request) return;

        setLoading(true);
        setError(null);

        saveProduct(request)
            .then(prod => {
                setSavedProduct(prod);
            })
            .catch(err => {
                setError(err.message || "Erro desconhecido ao salvar");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [request]);

    return {
        triggerSave,
        savedProduct,
        loading,
        error,
    };
}

export default useSaveProduct;
