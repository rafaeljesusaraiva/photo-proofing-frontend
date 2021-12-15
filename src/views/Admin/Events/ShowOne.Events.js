import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AdminBar, AlertBar, NavBar } from "@components";
import { AdminApi } from "@services";
import { Timeout } from "@utils";
import dayjs from "dayjs";

const ShowImages = (slug, full_images, watermarked) => {
    let allItems = [];
    let apiDomain = process.env.REACT_APP_DATABASE_URL;
    full_images.forEach((image, index) => {
        allItems.push(
            <tr key={index} className="hover">
                <td className="text-center">
                    <div className="relative max-w-full mx-4 my-2 gap-6 grid grid-cols-3 items-center">
                        <div className="flex flex-col items-center">
                            <img src={`${apiDomain}/public/album/${slug}/${watermarked[index].filename}`} id="watermark"/>
                            <div className="badge"><span className="select-none mr-2">W:</span>{watermarked[index].filename}</div> 
                            <div className="badge"><span className="select-none mr-2">O:</span>{image.filename}</div> 
                        </div>
                        <a className="btn btn-primary btn-sm mx-4" target='_blank' href={`${apiDomain}/delivery/${slug}/${image.filename}`}>Original</a>
                        <div className="btn btn-error btn-sm" >X</div>
                    </div>
                </td> 
            </tr>
        )
    });
    return allItems;
}

const SmallCell = (props) => {
    return (
        <th style={{paddingTop: "0.5rem", paddingBottom: "0.5rem"}} className="text-center">
            {props.children}
        </th>
    )
}

const InfoDiv = (props) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{props.title}</span>
            </label> 
            {props.edit ?
                <input type={props.type || "text"} defaultValue={props.value} className={"input"+(props.edit ? " bg-base-200" : "")} onChange={props.evt}/>
                : 
                <input type={props.type || "text"} defaultValue={props.value} className={"input"+(props.edit ? " bg-base-200" : "")} disabled={true}/>
            }
            
        </div>
    )
}

export function ShowOne(props) {

    document.title = `Detalhes Evento - Administração | Rafael Jesus Saraiva`;

    let { albumId } = useParams();
    const [alert, setAlert] = useState(null);

    // Store Event Information
    const [eventInfo, setEventInfo] = useState(null);

    // Functions for New Date Update date_event, date_available, date_finalOrder
    const setNewEventDate = async (e) => {
        let raw_date = e.target.value;
        let data = {
            date_event: raw_date
        }
        await AdminApi.updateEvent(eventInfo._id, data)
                    .catch(err => setAlert(<AlertBar status="error" message={err}/>));
    } 
    const setNewAvailableDate = async (e) => {
        let raw_date = e.target.value;
        let data = {
            date_available: raw_date
        }
        await AdminApi.updateEvent(eventInfo._id, data)
                    .catch(err => setAlert(<AlertBar status="error" message={err}/>));
    }
    const setNewFinalOrderDate = async (e) => {
        let raw_date = e.target.value;
        let data = {
            date_finalOrder: raw_date
        }
        await AdminApi.updateEvent(eventInfo._id, data)
                    .catch(err => setAlert(<AlertBar status="error" message={err}/>));
    }

    // Store New Photos List
    const [newPhotoW, setNewPhotoW] = useState([]);
    const [newPhotoF, setNewPhotoF] = useState([]);

    // Functions for New Image Upload
    const updateWatermarked = (images) => { setNewPhotoW(images) };
    const updateFinal = (images) => { setNewPhotoF(images) };
    const uploadImages = async () => {
        setAlert(null)
        if (newPhotoF.length == 0 || newPhotoW.length == 0) {
            setAlert(<AlertBar status="warning" message="É necessário escolher pelo menos uma fotografia!"/>);
            await Timeout(5000);
            setAlert(null);
            return;
        }
        if (newPhotoF.length !== newPhotoW.length) {
            setAlert(<AlertBar status="error" message="Quantidade de fotografias diferente!"/>);
            await Timeout(5000);
            setAlert(null)
            return;
        } 

        // Upload Final Images
        const uploadInfoF = new FormData();
        uploadInfoF.append("albumId", eventInfo._id);
        uploadInfoF.append("watermark", 'false');
        for (let i = 0 ; i < newPhotoF.length ; i++) {
            uploadInfoF.append("images", newPhotoF[i]);
        }

        // Upload Watermarked Images
        const uploadInfoW = new FormData();
        uploadInfoW.append("albumId", eventInfo._id);
        uploadInfoW.append("watermark", 'true');
        for (let i = 0 ; i < newPhotoW.length ; i++) {
            uploadInfoW.append("images", newPhotoW[i]);
        }

        await AdminApi.putImage(uploadInfoF)
                    .catch(err => setAlert(<AlertBar status="error" message={err}/>));
        await AdminApi.putImage(uploadInfoW)
                    .then(async data => {
                        setAlert(<AlertBar status="success" message="Fotografias guardadas com sucesso!"/>);
                        console.log(data)
                        await Timeout(1000);
                        // Refresh page
                        window.location.reload(false);
                    })
                    .catch(err => setAlert(<AlertBar status="error" message={err}/>));
    }

    console.log(eventInfo)

    useEffect(async () => setEventInfo(await AdminApi.getOneEvent(albumId)), [])

    return (
        <>
            <NavBar alertBar={alert}/>
            <AdminBar/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Administração</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                <div className="overflow-x-auto">
                    <div className="text-xl font-bold mb-4 select-none">
                        Detalhes Evento
                    </div>
                    <div className="overflow-x-auto">
                        { !eventInfo ? (
                            <button className="btn btn-circle loading md:col-span-3 w-full"></button>
                        ) : (
                            <>
                                <div className="card shadow-lg compact side bg-base-100">
                                    <div className="card-body grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InfoDiv title="Nome Evento" value={eventInfo.title}/>
                                        <InfoDiv title="Slug" value={eventInfo.slug} />
                                        <InfoDiv title="Criado a" type="datetime-local" value={dayjs(eventInfo.createdAt).format('YYYY-MM-DDTHH:mm:ss')} />
                                        <InfoDiv title="Data Evento" type="datetime-local" 
                                                value={dayjs(eventInfo.date_event).format('YYYY-MM-DDTHH:mm:ss')} 
                                                edit
                                                evt={setNewEventDate}
                                        />
                                        <InfoDiv title="Data Disponível" type="datetime-local" 
                                                value={dayjs(eventInfo.date_available).format('YYYY-MM-DDTHH:mm:ss')} 
                                                edit
                                                evt={setNewAvailableDate}
                                        />
                                        <InfoDiv title="Data Último Pedido" type="datetime-local" 
                                                value={dayjs(eventInfo.date_finalOrder).format('YYYY-MM-DDTHH:mm:ss')} 
                                                edit
                                                evt={setNewFinalOrderDate}
                                        />
                                        <div className="collapse border rounded-box border-base-300 collapse-arrow col-span-1 md:col-span-2 w-full">
                                            <input type="checkbox"/> 
                                            <div className="collapse-title text-xl font-medium">
                                                ({eventInfo.totalImages}) Fotografias
                                            </div> 
                                            <div className="collapse-content"> 
                                                <table className="table w-full table-compact">
                                                    <tbody>
                                                        {ShowImages(eventInfo.slug, eventInfo.images, eventInfo.watermarked)}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card shadow-lg compact side bg-base-100 mt-4 p-4 pt-6">
                                    <div className="text-l font-bold mb-2 select-none">
                                        Adicionar Fotografias
                                        <div className="badge badge-error ml-4">
                                            Atenção! Fotografias têm de estar na mesma ordem (miniaturas e finais)!
                                        </div>
                                    </div>
                                    <table className="table table-zebra col-span-full">
                                        <thead>
                                            <tr>
                                                <th>Miniaturas</th> 
                                                <th>Finais</th> 
                                                <th></th>
                                            </tr>
                                        </thead> 
                                        <tbody>
                                            <tr>
                                                <SmallCell>
                                                    <input type="file" name="watermarked" multiple={true} required={false} onChange={(e)=>updateWatermarked(e.target.files)}/>
                                                </SmallCell>
                                                <SmallCell>
                                                    <input type="file" name="final" multiple={true} required={false} onChange={(e)=>updateFinal(e.target.files)}/>
                                                </SmallCell>
                                                <SmallCell>
                                                    <a className="btn btn-primary btn-sm w-full" onClick={uploadImages}>+</a>
                                                </SmallCell>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}