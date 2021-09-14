import React from "react";
import { useHistory } from "react-router";
import { NavBar } from "@components";

export function CartCompletedPage(props) {

    let history = useHistory();
    const { state } = props.location;
    const orderNumber = (state.orderNumber) ? state.orderNumber : 0;
    const goToOrders = () => history.push('/encomendas');

    return (
        <>
            <NavBar/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">#{(orderNumber).toString().padStart(4, '0')} - Encomenda Finalizada</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                <div className="text-lg mx-6 md:mx-0 my-4 select-none">
                    Brevemente irá receber um email com informações relativas à confirmação da encomenda e método de pagamento.
                </div>
                <button className="btn btn-primary" onClick={goToOrders}>Ver as minhas Encomendas</button> 
            </div>
        </>
    )
}