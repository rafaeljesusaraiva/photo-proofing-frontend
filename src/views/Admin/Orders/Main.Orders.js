import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminBar, AlertBar, NavBar } from "@components";
import { AdminApi } from "@services";
import { Timeout } from "@utils";

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
    const updateList = props.updateList;
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
            <th className="hidden sm:table-cell">
                <input type="checkbox" class="checkbox" onChange={()=>{updateList(element.id)}}/>
            </th>
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

    const [alert, setAlert] = useState([]);
    const [orderList, setOrderList] = useState({});
    const [changeList, setChangeList] = useState([]);
    const [changeStatus, setChangeStatus] = useState(false);
    const showOrders = () => {
        let torder = [];
        Array.prototype.forEach.call(orderList, (element, index) => {
            torder.unshift(<OrderRow key={index} data={element} updateList={updateChangeList}/>)
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

    const updateChangeList = (orderID) => {
        if (changeList.includes(orderID)) {
            let tCL = changeList;
            tCL.splice(tCL.indexOf(orderID));
            setChangeList(tCL);
        } else {
            changeList.push(orderID);
        }
    }

    const updateChangeStatus = (event) => {
        setChangeStatus(event.target.value);
    }

    const processChangeStatus = async () => {
        if (changeList.length === 0 || changeStatus === false) {
            setAlert(<AlertBar status="alert" message={'Falta escolher encomenda/estado.'}/>)
            await Timeout(1500);
            setAlert([])
            return;
        }
        for (const oid of changeList) {
            let status = await AdminApi.updateOrderStatus(oid, changeStatus);
            setAlert(<AlertBar status="info" message={status}/>)
            await Timeout(500);
            setAlert([])
        }
        window.location.reload(false);
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
            <NavBar alertBar={alert}/>
            <AdminBar/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Administração</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                <div className="overflow-x-auto mx-6">
                    <div className="text-xl font-bold mb-4 select-none w-full">
                        Lista Encomendas
                    </div>
                    <div className="btn-group bg-base-300 rounded-lg flex justify-evenly md:flex-nowrap w-full mb-2 shrink">
                        <div className="btn bg-base-300 border-0 flex-grow">
                            <div className="flex flex-row items-center">
                                <select class="select select-bordered select-sm" onChange={(e)=>{updateChangeStatus(e)}}>
                                    <option disabled="disabled" selected="selected">Escolher um estado</option> 
                                    <option value="Recebida - Por Pagar">Recebida - Por Pagar</option> 
                                    <option value="A Processar">A Processar</option>
                                    <option value="Em Entrega">Em Entrega</option>
                                    <option value="Paga">Paga</option> 
                                    <option value="Entregue">Entregue</option>
                                    <option value="Cancelada">Cancelada</option>
                                </select> 
                                <div className="btn btn-primary btn-xs ml-2" onClick={() => processChangeStatus()}>Atualizar</div>
                            </div>
                        </div>
                        <div className="btn bg-base-300 border-0 flex-grow hover:bg-base-100" onClick={() => process_orders()}>
                            Obter Encomendas (Excel)
                        </div>
                        <div className="btn bg-base-300 border-0 flex-grow hover:bg-base-100" onClick={() => process_orders_zip()}>
                            Obter Encomendas (Zip)
                        </div>
                    </div>
                    <div className="overflow-x-auto w-full">
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