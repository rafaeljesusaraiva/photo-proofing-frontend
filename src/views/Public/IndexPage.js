import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Api } from "@services";
import { Card, NavBar } from "@components";
import { DateInBetween } from "@utils";

export function Index() {

    document.title = `Início | Rafael Jesus Saraiva`;
    
    const [albums, setAlbums] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(()=>{
        async function execute() {
            if (albums.length === 0) {
                setAlbums(await Api.getAlbums());
            }
        }
        execute();
    }, [albums])

    return (
        <>
            <NavBar/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Trabalhos Disponíveis</h2>
            <div className="masonry grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 flex-grow justify-center mx-6 md:mx-auto my-4">
                {(albums.length === 0) ? (
                    <button className="btn btn-4xl loading col-span-3"/>
                ) : ''}
                {albums.map((singleAlbum, index) => {
                    let isValid = DateInBetween(
                        singleAlbum.date_available,
                        (new Date()).toLocaleDateString('pt-PT'),
                        singleAlbum.date_finalOrder
                    );
                    let albumInfo = {
                        name: singleAlbum.title,
                        url: "/prova/" + singleAlbum.slug,
                        cover: process.env.REACT_APP_DATABASE_URL + singleAlbum.cover
                    }
                    return <Card key={'album-'+index} className="break-inside max-h-80 md:max-h-35v" valid={isValid} info={albumInfo} setShowModal={setShowModal} showModal={showModal}/>
                })}
            </div>
            <div className={"modal"+ (showModal ? " modal-open" : "")}>
                <div className="modal-box">
                    <h2 className="text-xl font-bold mb-4">AVISO</h2>
                    <p>Para visualizar o evento "<b>{showModal}</b>" é necessário inscrever ou fazer login.</p> 
                    <div className="modal-action">
                        <Link to="/login">
                            <label className="btn">Inscrever/Login</label> 
                        </Link>
                        <label onClick={()=>setShowModal(false)} className="btn btn-primary">Fechar Aviso</label> 
                    </div>
                </div>
            </div>
        </>
    );
}