// src/pages/HomePage.tsx
import React from 'react'
import { useProducts } from '../hooks/UseProduct'
import ProductList from '../components/ProductList'

export default function HomePage() {
    const { products, loading, error } = useProducts()

    if (loading) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p>🔄 Carregando produtos...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
                <p>❌ Erro ao carregar produtos:</p>
                <pre>{error}</pre>
            </div>
        )
    }

    return (
        <main style={{ padding: '1rem' }}>
            <h1 style={{ marginBottom: '1rem' }}>Catálogo de Produtos</h1>
            <ProductList products={products} />
        </main>
    )
}
