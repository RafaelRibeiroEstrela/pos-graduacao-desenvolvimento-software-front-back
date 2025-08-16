import './css/ProductList.css'
import ProductCard from "./ProductCard.tsx";
import type {ProductResponse} from "../../dtos/ProductResponse.ts"; // grid ou flex

interface Props {
    products: ProductResponse[]
}

export default function ProductList({products}: Props) {
    if (products.length === 0) {
        return <p>Nenhum produto encontrado.</p>
    }
    return (
        <section className="product-list">
            {products.map(prod => (
                <ProductCard key={prod.id} product={prod}/>
            ))}
        </section>
    )
}
