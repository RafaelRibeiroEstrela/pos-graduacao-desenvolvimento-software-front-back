import useDeleteProduct from "../hooks/UseDeleteProduct.ts";
import {useEffect, useState} from "react";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import "./css/ModalDeletarProduto.css"


type Props = {
    visible: boolean;
    productId: number | null;
    onHide: () => void;
    onUpdated?: (prod: number) => void;
};


function ModalDeletarProduto({
                                 visible,
                                 productId,
                                 onHide,
                                 onUpdated,
                             }: Props) {
    const { triggerDelete, deletedId, loading, error} = useDeleteProduct();
    const handleSubmit = () => {
        console.log("id: " + productId);
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
                label={loading ? "Deletando..." : "Deletar"}
                icon="pi pi-check"
                onClick={handleSubmit}
                //disabled={loading || !productId}
            />
        </div>
    );
/*
    useEffect(() => {
        if (visible && productId) {
            setProductId(productId);
        } else {
            setProductId(null);
        }
    }, [visible, productId]);


 */
    useEffect(() => {
        if (deletedId) {
            onUpdated?.(deletedId);
            onHide();
        }
    }, [deletedId, onHide, onUpdated, error]);
    return (
        <div>

            <Dialog  header=""
                     visible={visible}
                     onHide={onHide}
                     modal
                     blockScroll
                     style={{ width: "640px", maxWidth: "95vw", background: "red", borderRadius: "2vw" }}
                     footer={footer}>
                <p>Deseja realmente deletar o produto de id {productId} ?</p>
            </Dialog>
        </div>
        );

}

export default ModalDeletarProduto;