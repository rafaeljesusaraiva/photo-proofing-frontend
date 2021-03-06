import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminBar, NavBar } from "@components";
import { AdminApi } from "@services";

const AccountList = (accountList) => {
    let componentList = [];
    accountList.forEach((element, index) => {
        componentList.push(
            <tr key={index}>
                <td>
                    <div className="flex items-center space-x-3">
                        <div>
                            <div className="font-bold break-words">
                                {element.name}
                            </div> 
                            <span className={"badge select-none badge-sm badge-"+(element.role === "admin" ? "primary" : "accent")}>
                                {element.role === "admin" ? "Administrador" : "Cliente"}
                            </span>
                        </div>
                    </div>
                </td> 
                <td className="hidden sm:table-cell select-none">
                    {element.numberOfOrders} Encomendas
                </td> 
                <th className="text-center">
                    <Link to={"/administracao/clientes/"+element._id}>
                        <button className="btn btn-primary btn-xs">Detalhes</button>
                    </Link>
                </th>
            </tr>
        )
    });
    return componentList;
}

export function Main(){

    document.title = `Clientes - Administração | Rafael Jesus Saraiva`;

    const [accountList, setAccountList] = useState(null);

    useEffect(async ()=>{
        setAccountList(await AdminApi.getAllClients());
    }, [])

    return (
        <>
            <NavBar/>
            <AdminBar/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Administração</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                <div className="overflow-x-auto">
                    <div className="text-xl font-bold mb-4 select-none">
                        Lista Clientes
                    </div>
                    <div className="overflow-x-auto">
                        { !accountList ? (
                            <button className="btn btn-circle loading md:col-span-3 w-full"></button>
                        ) : (
                            <table className="table w-full">
                                <thead>
                                <tr>
                                    <th className="select-none">Nome</th> 
                                    <th className="hidden sm:table-cell select-none"></th> 
                                    <th></th>
                                </tr>
                                </thead> 
                                <tbody>
                                    {AccountList(accountList)}
                                </tbody> 
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}