import { useEffect, useState } from "react";
import type { ProductResponse } from "../../dtos/ProductResponse";
import useUpdateProduct from "../../hooks/UseUpdateProduct";
import { useNavigate } from "react-router-dom";
import PaginaPadrao from "../../components/PaginaPadrao";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Message } from "primereact/message";

function AtualizarProduto(product: ProductResponse) {
  const navigate = useNavigate();
  const [form, setForm] = useState<ProductResponse>(product);
  const { triggerUpdate, updatedProduct, loading, error } = useUpdateProduct();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerUpdate(form, form.id);
  };

  const handleCancel = () => {
    // limpa formulário
    setForm(product);
    // opcional: desvia para lista de produtos
    navigate("/");
  };

  // Quando o produto for salvo com sucesso, limpa o formulário
  useEffect(() => {
    if (updatedProduct) {
      navigate("/listar-produtos");
    }
  }, [updatedProduct]);



  return (
        <div>
            <PaginaPadrao />
            <h2>Cadastrar Novo Produto</h2>

            <form onSubmit={handleSubmit} className="p-fluid p-formgrid p-grid">
                {/* ... campos do formulário ... */}
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="name">Nome</label>
                    <InputText
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="price">Preço</label>
                    <InputNumber
                        id="price"
                        name="price"
                        value={form.price}
                        onValueChange={(e) => setForm(prev => ({ ...prev, price: e.value ?? 0 }))}
                        mode="currency"
                        currency="BRL"
                        locale="pt-BR"
                        required
                    />
                </div>
                <div className="p-field p-col-12">
                    <label htmlFor="description">Descrição</label>
                    <InputTextarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="category">Categoria</label>
                    <InputText
                        id="category"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="pictureUrl">URL da Imagem</label>
                    <InputText
                        id="pictureUrl"
                        name="pictureUrl"
                        value={form.pictureUrl}
                        onChange={handleChange}
                    />
                </div>

                <div className="p-field p-col-12">
                    <Button
                        type="submit"
                        label={loading ? 'Criando...' : 'Criar'}
                        icon="pi pi-check"
                        disabled={loading}
                    />
                    <Button
                        type="button"
                        label="Cancelar"
                        icon="pi pi-times"
                        className="p-button-secondary p-ml-2"
                        onClick={handleCancel}
                    />
                </div>
            </form>

            {error && (
                <Message
                    severity="error"
                    text={error}
                    style={{ marginTop: '1rem' }}
                />
            )}

            {updatedProduct && (
                <Message
                    severity="success"
                    text="Produto atualizado com sucesso!"
                    style={{ marginTop: '1rem' }}
                />
            )}
        </div>
    );
}

export default AtualizarProduto;
