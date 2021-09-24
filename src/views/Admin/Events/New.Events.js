import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { AdminBar, AlertBar, NavBar } from "@components";
import { AdminApi } from "@services";
import { StringToSlug, Timeout } from "@utils";
import { Link } from "react-router-dom";

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

export function NewEvent(props) {

    document.title = `Novo Evento - Administração | Rafael Jesus Saraiva`;

    const history = useHistory();
    const [alert, setAlert] = useState(null);
    const [title, setTitle] = useState(null);
    const [slug, setSlug] = useState(null);
    const [dateEvent, setDateEvent] = useState(null);
    const [dateAvailable, setDateAvailable] = useState(null);
    const [dateFinalOrder, setFinalOrder] = useState(null);
    const [cover, setCover] = useState(null);

    const submit = async e => {
        e.preventDefault()
        const data = new FormData()
        data.append("title", title)
        data.append("slug", slug)
        data.append("date_event", dateEvent)
        data.append("date_available", dateAvailable)
        data.append("date_finalOrder", dateFinalOrder)
        data.append("images", cover)
        await AdminApi.createEvent(data)
                        .then(async data => {
                            setAlert(<AlertBar status="success" message="Evento Criado! Será redirecionado dentro de momentos."/>);
                            await Timeout(3000);
                            setAlert(null);
                            console.log(data)
                            history.push('/administracao/eventos/'+data.id)
                        })
                        .catch(err => setAlert(<AlertBar status="error" message={err}/>));
    }

    return (
        <>
            <NavBar alertBar={alert}/>
            <AdminBar/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Administração</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                <div className="overflow-x-auto">
                    <div className="text-xl font-bold mb-4 select-none">
                        Novo Evento
                    </div>
                    <div className="overflow-x-auto">
                        <div className="card shadow-lg compact side bg-base-100">
                            <form onSubmit={submit} className="card-body grid grid-cols-2 md:grid-cols-6 gap-6">
                                <div className="form-control col-span-2 md:col-span-3">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label> 
                                    <input type="text" name="albumInfo[title]" className="input bg-base-200" required={true} onChange={e=>setTitle(e.target.value)}/>
                                </div>
                                <div className="form-control col-span-2 md:col-span-3">
                                    <label className="label">
                                        <span className="label-text">Slug</span>
                                    </label> 
                                    <input type="text" name="albumInfo[slug]" className="input bg-base-200" required={true} onChange={e=>setSlug(e.target.value)}/>
                                </div>
                                <div className="form-control col-span-2">
                                    <label className="label">
                                        <span className="label-text">Data Evento</span>
                                    </label> 
                                    <input type="date" name="albumInfo[date_event]" className="input bg-base-200" required={true} onChange={e=>setDateEvent(e.target.value)}/>
                                </div>
                                <div className="form-control col-span-2">
                                    <label className="label">
                                        <span className="label-text">Data Disponível</span>
                                    </label> 
                                    <input type="date" name="albumInfo[date_available]" className="input bg-base-200" required={true} onChange={e=>setDateAvailable(e.target.value)}/>
                                </div>
                                <div className="form-control col-span-2">
                                    <label className="label">
                                        <span className="label-text">Data Limite</span>
                                    </label> 
                                    <input type="date" name="albumInfo[date_finalOrder]" className="input bg-base-200" required={true} onChange={e=>setFinalOrder(e.target.value)}/>
                                </div>
                                <div className="form-control col-span-full">
                                    <label className="label">
                                        <span className="label-text">Imagem Capa</span>
                                    </label> 
                                    <input type="file" name="albumInfo[images]" className="input bg-base-200" required={true} onChange={e=>setCover(e.target.files[0])}/>
                                </div>
                                <button type="submit" className="btn btn-primary">Submeter</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}