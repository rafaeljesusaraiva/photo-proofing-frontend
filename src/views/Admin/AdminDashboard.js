import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminBar, NavBar } from "@components";
import { MiArrowSmall } from "@components/icons";
import { AdminApi } from "@services";

const showLastOrders = (orderList) => {
    let orderListRows = [];
    orderList.forEach(order => {
        orderListRows.push(
            <tr key={'order#'+order.id}>
                <th className="text-center">{order.orderCount.toString().padStart(4, '0')}</th> 
                <td>{order.client.name}</td> 
                <td className="hidden sm:table-cell">
                    {
                        order.promotion 
                        ? (
                            order.promotion.value
                            ? Number(order.totalNoPromotion - order.promotion.value).toFixed(2)+" €"
                            : Number(order.totalNoPromotion - (1 - order.promotion.percentage)).toFixed(2)+" €"
                        ) 
                        : Number(order.totalNoPromotion).toFixed(2)+" €"
                    }
                </td> 
                <td className="text-center">
                    <Link to={"/administracao/encomendas/"+order.id}>
                        <button className="btn btn-primary btn-sm align-middle">
                            <MiArrowSmall className="h-6 w-6"/>
                        </button>
                    </Link>
                </td>
            </tr>
        )
    })
    return orderListRows;
}

export function AdminDashboard() {

    document.title = `Administração | Rafael Jesus Saraiva`;

    const [widgetInfo, setWidgetInfo] = useState(null);

    useEffect(async ()=>{
        setWidgetInfo(await AdminApi.getWidgetInfo());
    }, [])
    
    console.log(widgetInfo)

    return (
        <>
            <NavBar/>
            <AdminBar/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Administração</h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3 flex-grow justify-center mx-6 md:mx-0 my-4">
                {!widgetInfo ? (
                    <div>A Carregar...</div>
                ) : (
                    <>
                        {/* Small Widgets */}
                        <div className="card bordered bg-base-300 p-4">
                            <span className="font-bold">Encomendas</span>
                            <span className="text-xs italic">Esta Semana</span>
                            <div className="p-2 text-4xl font-bold">
                                {widgetInfo.orderCount}
                            </div>
                        </div>
                        <div className="card bordered bg-base-300 p-4">
                            <span className="font-bold">Vendas</span>
                            <span className="text-xs italic">Esta Semana</span>
                            <div className="p-2 text-4xl font-bold">
                                {widgetInfo.sumSales}
                            </div>
                        </div>
                        <div className="card bordered bg-base-300 p-4">
                            <span className="font-bold">Despesas</span>
                            <span className="text-xs italic">Esta Semana</span>
                            <div className="p-2 text-4xl font-bold">
                                {widgetInfo.sumExpenses}
                            </div>
                        </div>
                        {/* Big List Widget */}
                        <div className="md:col-span-3">
                            <div className="text-2xl font-bold">
                                Últimas Encomendas
                            </div>
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th className="text-center">#</th> 
                                        <th>Cliente</th> 
                                        <th className="hidden sm:table-cell">Total</th> 
                                        <th></th>
                                    </tr>
                                </thead> 
                                <tbody>
                                    {showLastOrders(widgetInfo.lastOrders)}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}