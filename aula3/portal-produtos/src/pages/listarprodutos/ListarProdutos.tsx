import {useProducts} from "../../hooks/UseProduct.ts";
import ProductList from "./ProductList.tsx";
import PaginaPadrao from "../../components/PaginaPadrao.tsx";

function ListarProdutos() {
    const {products, loading, error} = useProducts()

    if (loading) {
        return (
            <div style={{padding: '2rem', textAlign: 'center'}}>
                <p>🔄 Carregando produtos...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div style={{padding: '2rem', textAlign: 'center', color: 'red'}}>
                <p>❌ Erro ao carregar produtos:</p>
                <pre>{error}</pre>
            </div>
        )
    }

    return (
        <div>
            <PaginaPadrao></PaginaPadrao>
            <main style={{padding: '1rem'}}>
                <h3 style={{marginBottom: '1rem'}}>Catálogo de Produtos</h3>
                <ProductList products={products}/>
            </main>
        </div>

    )
}

export default ListarProdutos;