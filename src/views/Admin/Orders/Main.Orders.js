import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminBar, NavBar } from "@components";
import { AdminApi } from "@services";

const OrderRow = (props) => {
    const element = props.data;
    const [isChecked, setIsChecked] = useState(false);
    const updateCheck = () => {
        if (props.allChecked && isChecked) {
            props.setAllChecked();
            setIsChecked(false);
            console.log('state child checked update')
        } else {
            isChecked ? setIsChecked(false) : setIsChecked(true)
        }
    }

    useEffect(()=>{
        if (props.allChecked) {
            setIsChecked(true)
        }
        console.log('state child update #'+element.orderCount, isChecked)
    })

    return (
        <tr>
            <th>
                <label>
                    <input type="checkbox" className="checkbox" value={isChecked || props.allChecked} onClick={updateCheck}/>
                </label>
            </th> 
            <td>#{element.orderCount.toString().padStart(4, '0')}</td> 
            <td><div className="badge badge-primary">primary</div></td>
            <td>Nome Cliente</td> 
            <td>10.00€</td> 
            <th className="text-center">
                <Link to={"/administracao/clientes/"+element._id}>
                    <button className="btn btn-ghost btn-xs">Detalhes</button>
                </Link>
            </th>
        </tr>
    )
}

export function Main(){

    document.title = `Encomendas - Administração | Rafael Jesus Saraiva`;

    const [orderList, setOrderList] = useState({});
    const [ordersChecked, setOrdersChecked] = useState(false);
    const updateCheckAll = () => { if (ordersChecked) { setOrdersChecked(false); uncheckAll(); } else setOrdersChecked(true); }
    const offAllButton = () => setOrdersChecked(false);
    const uncheckAll = () => {}
    const showOrders = () => {
        let torder = [];
        Array.prototype.forEach.call(orderList, (element, index) => {
            torder.unshift(<OrderRow key={index} data={element} allChecked={ordersChecked} setAllChecked={offAllButton}/>)
        })
        return torder;
    }

    useEffect(async ()=>{
        setOrderList(await AdminApi.getAllOrders());
    }, [])

    console.log('state update', ordersChecked)

    return (
        <>
            <NavBar/>
            <AdminBar/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Administração</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                <div className="overflow-x-auto">
                    <div className="text-xl font-bold mb-4 select-none">
                        Lista Encomendas
                    </div>
                    <div className="overflow-x-auto">
                        { !orderList ? (
                            <button className="btn btn-circle loading md:col-span-3 w-full"></button>
                        ) : (
                            <table className="table w-full">
                                <thead>
                                <tr>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" value={ordersChecked} onClick={updateCheckAll}/>
                                        </label>
                                    </th> 
                                    <th className="select-none">#</th> 
                                    <th className="select-none">Estado</th> 
                                    <th className="hidden sm:table-cell select-none">Cliente</th> 
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