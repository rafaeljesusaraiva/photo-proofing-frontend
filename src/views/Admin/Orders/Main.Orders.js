import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminBar, NavBar } from "@components";
import { AdminApi } from "@services";

const getFinalPrice = (price, discountObj) => {
    if (discountObj === null) {
        return price;
    }

    if (discountObj.percentage !== null) {
        return price - (price * discountObj.percentage)
    }

    return price - discountObj.value
}

const OrderRow = (props) => {
    const element = props.data;
    let currentState = () => {
        let status = element.status;
        switch (status) {
            case 'Paga':
                return (<div className="badge badge-primary">{status}</div>);
            case 'A Processar':
                return (<div className="badge badge-accent">{status}</div>);
            case 'Em Entrega':
                return (<div className="badge badge-accent">{status}</div>);
            case 'Entregue':
                return (<div className="badge badge-ghost">{status}</div>);
            case 'Cancelada':
                return (<div className="badge badge-error">{status}</div>);
            
            default:
                return (<div className="badge">Recebida - Por Pagar</div>);
        } 
    }

    return (
        <tr>
            <th className="hidden sm:table-cell"></th>
            <td>#{element.orderCount.toString().padStart(4, '0')} {currentState()}</td> 
            <td>{element.client.name}</td> 
            <td className="hidden sm:table-cell">{Number(getFinalPrice(element.totalNoPromotion, element.promotion)).toFixed(2)} €</td> 
            <th className="text-center">
                <Link to={"/administracao/encomendas/"+element.id}>
                    <button className="btn btn-ghost btn-xs">Detalhes</button>
                </Link>
            </th>
        </tr>
    )
}

export function Main(){

    document.title = `Encomendas - Administração | Rafael Jesus Saraiva`;

    const [orderList, setOrderList] = useState({});
    const showOrders = () => {
        let torder = [];
        Array.prototype.forEach.call(orderList, (element, index) => {
            torder.unshift(<OrderRow key={index} data={element}/>)
        })
        return torder;
    }

    const process_orders = async () => {
        const resInfo = await AdminApi.processOrders();
        const url = window.URL.createObjectURL(resInfo.response);
        const link = document.createElement("a");
        link.href = url;
        link.download = resInfo.filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const process_orders_zip = async () => {
        const resInfo = await AdminApi.processOrdersZip();
        const url = window.URL.createObjectURL(resInfo.response);
        const link = document.createElement("a");
        link.href = url;
        link.download = resInfo.filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    useEffect(()=>{
        async function execute() {
            let allOrders = await AdminApi.getAllOrders();
        setOrderList(allOrders);
        }
        execute();
    }, [])

    return (
        <>
            <NavBar/>
            <AdminBar/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Administração</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                <div className="overflow-x-auto">
                    <div className="text-xl font-bold mb-4 select-none">
                        Lista Encomendas
                        <div className="btn btn-accent btn-xs float-right mr-2" onClick={() => process_orders()}>Processar Encomendas (.xlxs)</div>
                        <div className="btn btn-accent btn-xs float-right" onClick={() => process_orders_zip()}>Processar Encomendas (.zip)</div>
                    </div>
                    <div className="overflow-x-auto">
                        { !orderList ? (
                            <button className="btn btn-circle loading md:col-span-3 w-full"></button>
                        ) : (
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th className="hidden sm:table-cell"></th>
                                        <th className="select-none">#</th> 
                                        <th className="select-none">Cliente</th> 
                                        <th className="hidden sm:table-cell select-none">Valor</th> 
                                        <th></th>
                                    </tr>
                                </thead> 
                                <tbody>
                                    {showOrders()}
                                </tbody> 
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}