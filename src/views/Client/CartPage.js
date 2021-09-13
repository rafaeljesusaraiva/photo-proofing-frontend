import React, { useState, useEffect } from "react";
import { AlertBar, CartTableRow, Modal, NavBar } from "@components";
import { useCart } from "react-use-cart";

export function CartPage() {
    const [alert, setAlert] = useState(null);
    const [imagePreview, setimagePreview] = useState({ show: false, url: null });
    const { items } = useCart();

    const openPreview = (url) => setimagePreview({ show: true, url: url });
    const closePreview = () => setimagePreview({ show: false, url: null });

    console.log(items)

    return (
        <>
            <NavBar alertBar={alert}/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Carrinho</h2>
            <div className="overflow-x-auto flex-grow w-full md:mx-auto my-4">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className="hidden md:table-cell"></th> 
                            <th className="md:hidden">Imagem</th>
                            <th className="hidden md:table-cell">Nome</th> 
                            <th>Tam.</th> 
                            <th>Qtd.</th>
                            <th></th>
                        </tr>
                    </thead> 
                    <tbody>
                        {
                            items.map((cartItem, index) => <CartTableRow key={"item-"+index} info={cartItem} openPreview={openPreview}/>)
                        }
                    </tbody>
                </table>
            </div>
            <Modal show={imagePreview.show} close={closePreview} url={imagePreview.url}/>
        </>
    );
}