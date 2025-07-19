// src/components/ProductList.tsx
import React from 'react'
import { Product } from '../models/Product'   // <<< puxa o tipo daqui
import ProductCard from './ProductCard'
import './css/ProductList.css'  // grid ou flex

interface Props {
    products: Product[]
}

export default function ProductList({ products }: Props) {
    if (products.length === 0) {
        return <p>Nenhum produto encontrado.</p>
    }

    return (
        <section className="product-list">
            {products.map(prod => (
                <ProductCard key={prod.id} product={prod} />
            ))}
        </section>
    )
}
