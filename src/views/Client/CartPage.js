import React, { useState } from "react";
import { useHistory } from "react-router";
import { AlertBar, CartTableRow, Modal, NavBar } from "@components";
import { useCart } from "react-use-cart";
import { Api } from "@services";
import { Timeout } from "@utils";

const CartTableHead = () => {
    return (
        <thead>
            <tr>
                <th className="hidden md:table-cell"></th> 
                <th className="md:hidden">Imagem</th>
                <th className="hidden md:table-cell">Nome</th> 
                <th className="text-center">Tam.</th> 
                <th className="text-center">Qtd.</th>
                <th className="hidden sm:table-cell"></th>
                <th className="hidden md:table-cell"></th>
                <th></th>
            </tr>
        </thead> 
    );
}

const SeperatedInput = (props) => {
    let { placeholder, buttonText, setPromoCode, checkPromoCode } = props;
    return (
        <div className="w-full float-left mb-4">
            <div className="flex space-x-2 float-right">
                <input type="text" id="promoCode" onChange={(e)=>setPromoCode(e.target.value)} placeholder={placeholder} className="w-full input input-bordered focus:shadow-none"/> 
                <button className="btn bg-base-100" onClick={checkPromoCode}>{buttonText}</button>
            </div>
        </div>
    );
}

const JointInput = (props) => {
    let { inputText, buttonText, oldPrice, handleOrder, loading } = props;
    return (
        <div className="w-full float-left mb-4">
            <div className="float-right relative">
                <input readOnly={true} type="text" className="focus:shadow-none select-none w-full pr-16 input input-primary border-0 cursor-default font-bold" value={inputText}/> 
                <button className={"absolute top-0 right-0 rounded-l-none btn btn-primary "+(loading ? "loading" : "")} onClick={handleOrder}>{!loading ? buttonText : ""}</button>
            </div>
            <div className="float-right">
            {(oldPrice !== '') ? (
                <button className="btn no-animation hover:bg-base-200 hover:border-opacity-0 cursor-default text-red-400 line-through" onClick={handleOrder}>
                    {oldPrice}
                </button>
            ) : ""}
            </div>
        </div>
    );
}

export function CartPage() {

    document.title = `Carrinho | Rafael Jesus Saraiva`;

    let history = useHistory();
    const [alert, setAlert] = useState(null);
    const [imagePreview, setimagePreview] = useState({ show: false, url: null });
    const [promoCode, setPromoCode] = useState("");
    const [promoStatus, setPromoStatus] = useState(false);
    const [readyPush, setReadyPush] = useState(true);
    const { items, cartTotal } = useCart();

    const openPreview = (url) => setimagePreview({ show: true, url: url });
    const closePreview = () => setimagePreview({ show: false, url: null });
    const checkPromotion = async () => {
        setReadyPush(false);
        if (promoCode !== '') {
            let promo = await Api.checkPromotion(promoCode);
            if (promo.status === 'invalid') {
                setAlert(<AlertBar status="error" message="Código promocional inválido!"/>);
                await Timeout(2500);
                setAlert(null);
            } else {
                setPromoStatus(promo);
                setAlert(<AlertBar status="success" message="Código promocional aplicado ao carrinho!"/>);
                await Timeout(2500);
                setAlert(null);
            }
        }
        setReadyPush(true);
    };
    const handleOrder = async () => {
        while (!readyPush) {
            await Timeout(500);
        }
        history.push({
            pathname: '/resumo-carrinho',
            state: {
                promoStatus: (promoStatus) ? promoStatus : null,
                promoCode: (promoCode) ? promoCode : null
            }
        });
    }

    return (
        <>
            <NavBar alertBar={alert}/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Carrinho</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                {(items.length > 0) ? (
                    <>
                        <table className="table w-full mb-4">
                            <CartTableHead/>
                            <tbody>
                                { items.map((cartItem, index) => <CartTableRow key={"item-"+index} info={cartItem} openPreview={openPreview}/>) }
                            </tbody>
                        </table>
                        <SeperatedInput placeholder="Código Promocional" buttonText="Verificar" setPromoCode={setPromoCode} checkPromoCode={checkPromotion}/>
                        {promoStatus ? (
                            <JointInput 
                                inputText={"Total  " + Number((promoStatus.percentage !== null)
                                                                    ? (cartTotal * (1 - promoStatus.percentage))
                                                                    : (cartTotal - promoStatus.value)
                                                                ).toFixed(2) + " €"} 
                                buttonText="Finalizar" 
                                oldPrice={Number(cartTotal).toFixed(2)+" €"}
                                handleOrder={handleOrder}
                                loading={!readyPush}
                            />
                        ) : (
                            <JointInput inputText={"Total  " + Number(cartTotal).toFixed(2) + " €"} buttonText="Finalizar" handleOrder={handleOrder} loading={!readyPush}/>
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
    );
}