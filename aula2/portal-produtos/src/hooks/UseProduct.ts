// src/hooks/useProducts.ts
import { useState, useEffect } from 'react'
import { fetchProducts } from '../api/ProductClient'
import { Product } from '../models/Product'   // <<< puxa o tipo daqui

interface UseProductsResult {
    products: Product[]
    loading: boolean
    error: string | null
}

export function useProducts(): UseProductsResult {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        fetchProducts()
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

    return { products, loading, error }
}
