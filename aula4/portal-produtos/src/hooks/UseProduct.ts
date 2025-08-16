// src/hooks/useProducts.ts
import {useEffect, useState} from 'react'
import type {ProductResponse} from "../dtos/ProductResponse.ts";
import {fetchProducts} from "../controllers/ProductController.ts";

export function useProducts(filtro: string): {
    products: ProductResponse[];
    loading: boolean;
    error: string | null;
} 
{
    const [products, setProducts] = useState<ProductResponse[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        fetchProducts(filtro)
            .then(data => {
                if (isMounted) {
                    setProducts(data)
                }
            })
            .catch(err => {
                if (isMounted) {
                    setError(err.message ?? 'Erro desconhecido')
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false)
                }
            })

        return () => {
            isMounted = false
        }
    }, [])

    return {products, loading, error}
}
