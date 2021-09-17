import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AdminBar, AlertBar, NavBar } from "@components";
import { AdminApi } from "@services";
import { Timeout } from "@utils";
import { Link } from "react-router-dom";

const UserInfo = (props) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{props.title}</span>
            </label> 
            <input type="text" value={props.value} className="input" disabled={true}/>
        </div>
    )
}

const showClientOrders = (orderList) => {
    let allItems = [];
    orderList.forEach((element, index) => {
        allItems.push(
            <tr key={index} className="hover">
                <th className="text-center">{index+1}</th> 
                <td>#{element.orderCount.toString().padStart(4, '0')}</td> 
                <td className="text-right">
                    <Link to={"/administracao/encomendas/"+element.id}>
                        <button className="btn btn-primary btn-sm">Ver Encomenda</button> 
                    </Link>
                </td>
            </tr>
        )
    });
    return allItems;
}

export function ShowOne(props) {

    document.title = `Detalhes Cliente - Administração | Rafael Jesus Saraiva`;

    const [accountInfo, setAccountInfo] = useState(null);
    const [alert, setAlert] = useState([]);
    let { clientId } = useParams();

    const handleUpdate = async (event) => {
        const newRole = event.target.value;
        let status = await AdminApi.updateUserPrivilege(clientId, newRole);
        setAlert(<AlertBar status="info" message={status}/>)
        await Timeout(1500);
        setAlert([])
    }

    useEffect(async ()=>{
        setAccountInfo(await AdminApi.getOneClient(clientId));
    }, [])

    console.log(accountInfo)

    return (
        <>
            <NavBar alertBar={alert}/>
            <AdminBar/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Administração</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                <div className="overflow-x-auto">
                    <div className="text-xl font-bold mb-4 select-none">
                        Detalhes Cliente
                    </div>
                    <div className="overflow-x-auto">
                        { !accountInfo ? (
                            <button className="btn btn-circle loading md:col-span-3 w-full"></button>
                        ) : (
                            <div className="card shadow-lg compact side bg-base-100">
                                <div className="card-body grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <UserInfo title="Nome" value={accountInfo.name}/>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Cargo</span>
                                        </label> 
                                        <select className="select select-bordered" defaultValue={accountInfo.role} onChange={(e)=>handleUpdate(e)}>
                                            <option value="admin">Administrador</option> 
                                            <option value="client">Cliente</option> 
                                        </select> 
                                    </div>
                                    <UserInfo title="Email" value={accountInfo.email}/>
                                    <UserInfo title="Telemóvel" value={accountInfo.phoneNumber}/>
                                    <div className="collapse border rounded-box border-base-300 collapse-arrow col-span-1 md:col-span-2 w-full">
                                        <input type="checkbox"/> 
                                        <div className="collapse-title text-xl font-medium">
                                            {accountInfo.orders.length} Encomendas Feitas
                                        </div> 
                                        <div className="collapse-content"> 
                                            <table className="table w-full table-compact">
                                                <tbody>
                                                    {showClientOrders(accountInfo.orders)}                                                
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