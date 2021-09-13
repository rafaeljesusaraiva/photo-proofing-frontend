import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Api } from "@services";
import { FilterAlbum } from "@utils";
import { AlertBar, NavBar } from "@components";

export function AlbumPage(props) {

    const { id } = useParams();
    const [alert, setAlert] = useState(null);
    let [ album, setAlbum ] = useState([])

    useEffect(async ()=>{
        let albums = await Api.getAlbums()
        setAlbum(FilterAlbum(albums, id));
    }, [])

    console.log(album)

    return (
        <>
            <NavBar alertBar={alert}/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">{album.title}</h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 flex-grow justify-center mx-6 md:mx-auto my-4">
                {/* {(albums.length === 0) ? (
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
                    return <Card key={'album-'+index} className="max-h-80 md:max-h-35v" valid={isValid} info={albumInfo}/>
                })} */}
            </div>
        </>
    );
}