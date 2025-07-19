// src/components/ProductCard.tsx
import React, {ComponentType} from 'react'
import { Product } from '../models/Product'   // <<< puxa o tipo daqui
import './css/ProductCard.css'  // ou use CSS Modules / Styled Components / Tailwind

interface Props {
    product: Product
}

const ProductCard: ComponentType<Props> = ({ product }) => {
    return (
        <article className="product-card">
            <img
                className="product-card__image"
                src={product.pictureUrl}
                alt={product.name}
            />

            <div className="product-card__body">
                <h2 className="product-card__title">{product.name}</h2>
                <p className="product-card__price">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                </p>
                <p className="product-card__category">{product.category}</p>
                {/* opcional: descrição resumida */}
                <p className="product-card__description">
                    {product.description.slice(0, 100)}…
                </p>
            </div>
        </article>
    )
}

export default ProductCard