import React, { useState } from "react";
import { Redirect, useHistory } from "react-router";
import { useCart } from "react-use-cart";
import { AlertBar, CartTableRowSimple, Modal, NavBar } from "@components";
import { Api, Authentication } from "@services";

const CartTableHead = () => {
    return (
        <thead>
            <tr>
                <th className="hidden md:table-cell"></th> 
                <th className="md:hidden">Imagem</th>
                <th className="hidden md:table-cell">Nome</th> 
                <th className="text-center">Tam.</th> 
                <th className="text-center">Qtd.</th>
                <th className="hidden sm:table-cell text-center">Sub-total</th>
                <th className="hidden md:table-cell"></th>
            </tr>
        </thead> 
    );
}


const JointInput = (props) => {
    let { inputText, buttonText, oldPrice, handleOrder } = props;
    return (
        <div className="w-full float:none md:float-left text-center md:text-left mb-4">
            <div className="float:none md:float-right relative">
                <input readOnly={true} type="text" className="focus:shadow-none select-none w-full pr-32 md:pr-40 input input-primary border-0 cursor-default font-bold" value={inputText}/> 
                <button className="absolute top-0 right-0 rounded-l-none btn btn-primary" onClick={handleOrder}>{buttonText}</button>
            </div>
            <div className="float:none md:float-right">
            {(oldPrice !== '') ? (
                <button className="btn no-animation hover:bg-base-200 hover:border-opacity-0 cursor-default text-red-400 line-through" onClick={handleOrder}>
                    {oldPrice}
                </button>
            ) : ""}
            </div>
        </div>
    );
}

const formatItems = (itemList) => {
    let items = [];
    itemList.forEach(element => {
        for (let i=0; i<element.quantity; i++) {
            items.push({
                item: element.imageId,
                size: element.sizeId
            })
        }
    });
    return items;
}

export function CartSummary(props) {

    const { items, cartTotal, emptyCart } = useCart();
    if (items.length === 0) { return <Redirect to="/carrinho"/> }

    document.title = `Resumo Carrinho | Rafael Jesus Saraiva`;

    let history = useHistory();
    let currentUser = Authentication.currentUserValue;
    const { state } = props.location;
    const [imagePreview, setimagePreview] = useState({ show: false, url: null });
    const [alert, setAlert] = useState(null);
    const [orderNote, setOrderNote] = useState("")
    const promoStatus = (state.promoStatus !== undefined && state.promoStatus !== null) ? state.promoStatus : null;
    const promoCode = (state.promoCode !== undefined && state.promoCode !== null) ? state.promoCode : null;

    const openPreview = (url) => setimagePreview({ show: true, url: url });
    const closePreview = () => setimagePreview({ show: false, url: null });

    const handleOrder = async () => {
        let orderInfo = { 
            client: currentUser.id, 
            items: formatItems(items), 
            promotion: promoStatus ? promoCode : null,
            note: (orderNote !== "") ? orderNote : null
        }

        let order = await Api.submitCart(orderInfo).catch(err => setAlert(<AlertBar status="error" message={err}/>));
        if (order && order.status === 'Recebida') {
            emptyCart();
            history.push({
                pathname: '/encomenda-finalizada',
                state: {
                    orderNumber: order.orderCount
                }
            });
        }
    }

    return (
        <>
            <NavBar alertBar={alert}/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Resumo Carrinho</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                {(items.length > 0) ? (
                    <>
                        <table className="table w-full mb-12 md:mb-4">
                            <CartTableHead/>
                            <tbody>
                                { items.map((cartItem, index) => <CartTableRowSimple key={"item-"+index} info={cartItem} openPreview={openPreview}/>) }
                            </tbody>
                        </table>
                        <div className="form-control mb-12 md:mb-4">
                            <label className="label">
                                <span className="label-text">Notas</span>
                            </label> 
                            <textarea className="textarea h-24 textarea-bordered w-50" placeholder="Notas da Encomenda..." onChange={(e)=>setOrderNote(e.target.value)}></textarea>
                        </div>
                        {promoStatus ? (
                            <JointInput 
                                inputText={"Total  " + Number((promoStatus.percentage !== null)
                                                                    ? (cartTotal * (1 - promoStatus.percentage))
                                                                    : (cartTotal - promoStatus.value)
                                                                ).toFixed(2) + " €"} 
                                buttonText="Finalizar Encomenda" 
                                oldPrice={Number(cartTotal).toFixed(2)+" €"}
                                handleOrder={handleOrder}
                            />
                        ) : (
                            <JointInput inputText={"Total  " + Number(cartTotal).toFixed(2) + " €"} buttonText="Finalizar Encomenda" handleOrder={handleOrder}/>
                        )}
                    </>
                ) : (
                    <div className="text-lg mx-6 md:mx-0 my-4 select-none">
                        Nenhum item no carrinho
                    </div>
                )}
            </div>
            <Modal show={imagePreview.show} close={closePreview} url={imagePreview.url}/>
        </>
    )
}