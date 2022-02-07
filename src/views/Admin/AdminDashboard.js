import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminBar, NavBar } from "@components";
import { MiArrowSmall } from "@components/icons";
import { AdminApi } from "@services";

const showLastOrders = (orderList) => {
    let orderListRows = [];
    orderList.forEach(order => {
        orderListRows.push(
            <tr key={'order#'+order.id} className="rounded-lg">
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

    useEffect(() => {
        const execute = async () => {
            setWidgetInfo(await AdminApi.getWidgetInfo());
        }
        execute();
    }, [])

    return (
        <>
            <NavBar/>
            <AdminBar/>
            <h2 className="shrink text-4xl mx-6 md:mx-0 my-4 select-none">Administração</h2>
            {!widgetInfo ? (
                <button className="btn btn-circle loading md:col-span-3 w-full"></button>
            ) : (
                <>
                    <div class="grid-flow-row md:grid-flow-col shadow stats mx-6 md:mx-0 my-4">
                        <div class="stat place-items-center place-content-center bg-base-300">
                            <div class="stat-title">Encomendas</div> 
                            <div class="stat-value">{widgetInfo.orderCount}</div> 
                            <div class="stat-desc">Até agora</div>
                        </div> 
                        <div class="stat place-items-center place-content-center bg-base-300">
                            <div class="stat-title">Vendas</div> 
                            <div class="stat-value text-success">{widgetInfo.sumSales}</div> 
                            <div class="stat-desc text-success">Até agora</div>
                        </div> 
                        <div class="stat place-items-center place-content-center bg-base-300">
                            <div class="stat-title">Despesas</div> 
                            <div class="stat-value text-error">{widgetInfo.sumExpenses}</div> 
                            <div class="stat-desc text-error">Até agora</div>
                        </div>
                    </div>
                    {/* Big List Widget */}
                    <div className="text-2xl font-bold shrink mx-6 md:mx-0">
                        Últimas Encomendas
                    </div>
                    <table className="table grow mx-2 md:mx-0">
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
                </>
            )}
        </>
    );
}