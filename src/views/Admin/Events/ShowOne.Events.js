import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AdminBar, NavBar } from "@components";
import { AdminApi } from "@services";
import dayjs from "dayjs";

const ShowImages = (showList) => {
    let allItems = [];
    showList.forEach((element, index) => {
        allItems.push(
            <tr key={index} className="hover">
                <td className="text-center">{'> '}</td> 
                <td className="text-center">{"€ cada"}</td> 
            </tr>
        )
    });
    return allItems;
}

const InfoDiv = (props) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{props.title}</span>
            </label> 
            <input type={props.type || "text"} defaultValue={props.value} className={"input"+(props.edit ? " bg-base-200" : "")} disabled={!props.edit}/>
        </div>
    )
}

export function ShowOne(props) {

    document.title = `Detalhes Evento - Administração | Rafael Jesus Saraiva`;

    const [eventInfo, setEventInfo] = useState(null);
    let { albumId } = useParams();

    useEffect(async ()=>{
        setEventInfo(await AdminApi.getOneEvent(albumId));
    }, [])

    console.log(eventInfo)

    return (
        <>
            <NavBar/>
            <AdminBar/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Administração</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                <div className="overflow-x-auto">
                    <div className="text-xl font-bold mb-4 select-none">
                        Detalhes Evento (falta update às datas)
                    </div>
                    <div className="overflow-x-auto">
                        { !eventInfo ? (
                            <button className="btn btn-circle loading md:col-span-3 w-full"></button>
                        ) : (
                            <div className="card shadow-lg compact side bg-base-100">
                                <div className="card-body grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InfoDiv title="Nome Evento" value={eventInfo.title}/>
                                    <InfoDiv title="Slug" value={eventInfo.slug} />
                                    <InfoDiv title="Criado a" type="datetime-local" value={dayjs(eventInfo.createdAt).format('YYYY-MM-DDTHH:mm:ss')} />
                                    <InfoDiv title="Data Evento" type="datetime-local" value={dayjs(eventInfo.date_event).format('YYYY-MM-DDTHH:mm:ss')} edit/>
                                    <InfoDiv title="Data Disponível" type="datetime-local" value={dayjs(eventInfo.date_available).format('YYYY-MM-DDTHH:mm:ss')} edit/>
                                    <InfoDiv title="Data Último Pedido" type="datetime-local" value={dayjs(eventInfo.date_finalOrder).format('YYYY-MM-DDTHH:mm:ss')} edit/>
                                    <div className="collapse border rounded-box border-base-300 collapse-arrow col-span-1 md:col-span-2 w-full">
                                        <input type="checkbox"/> 
                                        <div className="collapse-title text-xl font-medium">
                                            ({eventInfo.totalImages}) Fotografias
                                        </div> 
                                        <div className="collapse-content"> 
                                            <table className="table w-full table-compact">
                                                <tbody>
                                                    {ShowImages(eventInfo.images)}
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