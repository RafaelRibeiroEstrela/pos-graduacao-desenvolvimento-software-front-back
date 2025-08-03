
import './css/ProductCard.css'
import type {ProductResponse} from "../../dtos/ProductResponse.ts";
import type {ComponentType} from "react";

interface Props {
    product: ProductResponse
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