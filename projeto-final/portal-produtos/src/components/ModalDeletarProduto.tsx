import useDeleteProduct from "../hooks/UseDeleteProduct.ts";
import {useEffect, useState} from "react";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";


type Props = {
    visible: boolean;
    productId: number | null;
    onHide: () => void;
    onUpdated?: (prod: number) => void;
};


function ModalDeletarProduto({
                                 visible,
                                 onHide,
                                 onUpdated,
                             }: Props) {
    const { triggerDelete, deletedId, loading, error} = useDeleteProduct();
    const [productId, setProductId] = useState<number | null>(null);
    const handleSubmit = () => {
        if (productId == null) return;
        triggerDelete(productId);
    };
    const footer = (
        <div className="flex gap-2 justify-end">
            <Button
                type="button"
                label="Cancelar"
                icon="pi pi-times"
                className="p-button-secondary"
                onClick={onHide}
                disabled={loading}
            />
            <Button
                type="button"
                label={loading ? "Atualizando..." : "Atualizar"}
                icon="pi pi-check"
                onClick={handleSubmit}
                disabled={loading || !productId}
            />
        </div>
    );

    useEffect(() => {
        if (visible && productId) {
            setProductId(productId);
        } else {
            setProductId(null);
        }
    }, [visible, productId]);

    useEffect(() => {
        if (deletedId) {
            onUpdated?.(deletedId);
            onHide();
        }
    }, [deletedId, onHide, onUpdated, error]);

    <div>
        <p>Deseja realmente deletar o produto de id {productId} ?</p>
        <Dialog  header="Deletar Produto"
                 visible={visible}
                 onHide={onHide}
                 modal
                 blockScroll
                 style={{ width: "640px", maxWidth: "95vw" }}
                 footer={footer}>

        </Dialog>
    </div>
}

export default ModalDeletarProduto;