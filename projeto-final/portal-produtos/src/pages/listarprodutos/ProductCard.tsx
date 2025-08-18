import "./css/ProductCard.css";
import type { ProductResponse } from "../../dtos/ProductResponse.ts";
import { useState, type ComponentType } from "react";
import { Button } from "primereact/button";
import useUpdateProduct from "../../hooks/UseUpdateProduct.ts";
import ModalAtualizarProduto from "../../components/ModalAtualizarProduto.tsx";
import useDeleteProduct from "../../hooks/UseDeleteProduct.ts";
import { useNavigate } from "react-router-dom";

interface Props {
  product: ProductResponse;
}

const ProductCard: ComponentType<Props> = ({ product }) => {
    const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { triggerUpdate, updatedProduct, loading, error } = useUpdateProduct();
  const {triggerDelete} = useDeleteProduct();

  return (
    <article className="product-card">
      <img
        className="product-card__image"
        src={product.pictureUrl}
        alt={product.name}
      />

      <div className="product-card__body">
        <h2 className="product-card__title">id: {product.id}</h2>
        <h2 className="product-card__title">{product.name}</h2>
        <p className="product-card__price">
          R$ {product.price.toFixed(2).replace(".", ",")}
        </p>
        <p className="product-card__category">{product.category}</p>
        {/* opcional: descrição resumida */}
        <p className="product-card__description">
          {product.description.slice(0, 100)}…
        </p>
        <Button onClick={() => setOpen(true)}>Atualizar</Button>
        <Button onClick={() => triggerDelete(product.id)} disabled={loading}>Deletar</Button>

        <ModalAtualizarProduto
          visible={open}
          product={product}
          onHide={() => setOpen(false)}
          onUpdate={(data) => triggerUpdate(data, data.id)}
          loading={loading}
          error={error}
          onUpdated={() => navigate(0)}   // <— recarrega a rota atual
        />
      </div>
    </article>
  );
};

export default ProductCard;
