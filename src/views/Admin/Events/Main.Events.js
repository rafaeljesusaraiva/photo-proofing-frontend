import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminBar, NavBar } from "@components";
import { AdminApi } from "@services";
import dayjs from "dayjs";

const ShowList = (eventList) => {
    let componentList = [];
    eventList.forEach((element, index) => {
        componentList.push(
            <tr key={index}>
                <td>
                    <div className="flex items-center space-x-3">
                        <div>
                            <div className="font-bold break-words">
                                {element.title}
                            </div> 
                        </div>
                    </div>
                </td> 
                <td className="hidden sm:table-cell">
                    {dayjs(element.date_event).format('YYYY / MM / DD')}
                </td> 
                <th className="text-center">
                    <Link to={"/administracao/eventos/"+element._id}>
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

    const [eventList, setEventList] = useState(null);

    useEffect(async ()=>{
        setEventList(await AdminApi.getAllEvents());
    }, [])

    return (
        <>
            <NavBar/>
            <AdminBar/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Administração</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                <div className="overflow-x-auto">
                    <div className="text-xl font-bold mb-4 select-none">
                        Lista Eventos
                    </div>
                    <div className="overflow-x-auto">
                        { !eventList ? (
                            <button className="btn btn-circle loading md:col-span-3 w-full"></button>
                        ) : (
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th className="select-none">Nome</th> 
                                        <th className="hidden sm:table-cell select-none">Data</th> 
                                        <th className="text-right">
                                            <Link to={"/administracao/eventos/novo"}>
                                                <button className="btn btn-primary btn-xs">Novo Evento</button>
                                            </Link>
                                        </th>
                                    </tr>
                                </thead> 
                                <tbody>
                                    {ShowList(eventList)}
                                </tbody> 
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}