import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AdminBar, AlertBar, NavBar } from "@components";
import { AdminApi } from "@services";
import { Timeout } from "@utils";
import { MiEye } from "@components/icons";
import dayjs from "dayjs";

const getFinalPrice = (price, discountObj) => {
    if (discountObj === null) {
        return price;
    }

    if (discountObj.percentage !== null) {
        return price - (price * discountObj.percentage)
    }

    return price - discountObj.value
}

const OrderInfo = (props) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{props.title}</span>
            </label> 
            <input type="text" value={props.value} className="input" disabled={true}/>
        </div>
    )
}

const showOrdered = (productList) => {
    let allItems = [];
    const openPreview = (slug, item) => {
        const newWindow = window.open(process.env.REACT_APP_DATABASE_URL + '/public/album/' + slug + '/' + item, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    productList.forEach((element, index) => {
        allItems.push(
            <tr key={index} className="hover">
                <th className="rounded-l-md text-center">{index+1}</th> 
                <td>{element.item.album.title + " - " + element.item.filename}</td> 
                <td className="text-center">{element.size.size}</td> 
                <td className="text-center hidden md:table-cell">{Number(element.size.price).toFixed(2)} €</td> 
                <td className="rounded-r-md text-center hidden md:table-cell">
                    <button className="btn btn-sm btn-square btn-info mr-2" onClick={()=>{openPreview(element.item.album.slug, element.item.filename)}}>
                        <MiEye className="h-6 w-6"/>
                    </button>
                </td> 
            </tr>
        )
    });
    return allItems;
}

export function ShowOne(props) {

    document.title = `Detalhes Cliente - Administração | Rafael Jesus Saraiva`;

    const [orderInfo, setOrderInfo] = useState(null);
    const [alert, setAlert] = useState([]);
    let { orderId } = useParams();
    let orderNumber = (orderInfo !== null ? orderInfo.orderCount : 0);

    const handleOrderStatus = async (event) => {
        const newStatus = event.target.value;
        let status = await AdminApi.updateOrderStatus(orderId, newStatus);
        setAlert(<AlertBar status="info" message={status}/>)
        await Timeout(1500);
        setAlert([])
    }

    useEffect(async ()=>{
        setOrderInfo(await AdminApi.getOneOrder(orderId));
    }, [])

    return (
        <>
            <NavBar alertBar={alert}/>
            <AdminBar/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Administração</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                <div className="overflow-x-auto">
                    <div className="text-xl font-bold mb-4 select-none">
                        Detalhes Encomenda #{orderNumber.toString().padStart(4, '0')}
                    </div>
                    <div className="overflow-x-auto">
                        { !orderInfo ? (
                            <button className="btn btn-circle loading md:col-span-3 w-full"></button>
                        ) : (
                            <div className="card shadow-lg compact side bg-base-100">
                                <div className="card-body grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <OrderInfo title="Data da Encomenda" value={dayjs(orderInfo.createdAt).format('DD / MM / YYYY')}/>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Estado Encomenda</span>
                                        </label> 
                                        <select className="select select-bordered" defaultValue={orderInfo.status} onChange={(e)=>handleOrderStatus(e)}>
                                            <option value="Cancelada">Cancelada</option> 
                                            <option value="Recebida">Recebida</option> 
                                            <option value="Por Pagar">Por Pagar</option> 
                                            <option value="A Processar">A Processar</option> 
                                            <option value="Em Entrega">Em Entrega</option> 
                                            <option value="Entregue">Entregue</option> 
                                        </select> 
                                    </div>
                                    <OrderInfo title="Cliente" value={orderInfo.client.name}/>
                                    <OrderInfo title="Pagamento" value={"Por implementar -> Total "+Number(getFinalPrice(orderInfo.totalNoPromotion, orderInfo.promotion)).toFixed(2)+" €"}/>
                                    <div className="form-control mb-12 md:mb-4 col-span-1 md:col-span-2 w-full">
                                        <label className="label">
                                            <span className="label-text">Notas</span>
                                        </label> 
                                        <textarea className="textarea h-24 textarea-bordered w-50" defaultValue={orderInfo.note ? orderInfo.note : "Nenhuma Nota"}></textarea>
                                    </div>
                                    <div className="collapse border rounded-box border-base-300 collapse-arrow col-span-1 md:col-span-2 w-full">
                                        <input type="checkbox"/> 
                                        <div className="collapse-title text-xl font-medium">
                                            Encomendado
                                        </div> 
                                        <div className="collapse-content"> 
                                            <table className="table w-full table-compact">
                                                <tbody>
                                                    {showOrdered(orderInfo.products)}                                                
                                                </tbody>
                                            </table>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}