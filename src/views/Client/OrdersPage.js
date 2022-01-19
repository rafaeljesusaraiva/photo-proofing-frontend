import React, { useEffect, useState } from "react";
import { Modal, NavBar, OrdersCollapsable } from "@components";
import { Api } from "@services";

export function Orders() {
    
    document.title = `Encomendas | Rafael Jesus Saraiva`;

    const [orders, setOrders] = useState(false);
    const [imagePreview, setimagePreview] = useState({ show: false, url: null });

    const openPreview = (url) => setimagePreview({ show: true, url: url });
    const closePreview = () => setimagePreview({ show: false, url: null });

    useEffect(()=>{
        async function fetchOrders() {
            if (orders === false) {
                setOrders(await Api.getOrders())
            }
        }
        fetchOrders();
    }, [orders])
    
    return (
        <>
            <NavBar/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">As Minhas Encomendas</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                <div className="my-4 w-full flex flex-col">
                    {(orders === false) ? (
                        <>
                            <span>&nbsp;</span>
                            <button className="btn btn-circle loading"></button>
                            <span>&nbsp;</span>
                        </>
                    ) : (
                        (orders.length === 0) ? (
                            <div className="w-full">Nenhuma encomenda realizada.</div>
                        ) : (
                            orders.map((singleOrder, key) => {
                                return <OrdersCollapsable key={key} orderData={singleOrder} openPreview={openPreview}/>
                            })
                        )
                    )}
                </div>
            </div>
            <Modal show={imagePreview.show} close={closePreview} url={imagePreview.url}/>
        </>
    );
}