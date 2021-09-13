import React, { useEffect, useState } from "react";
import { Redirect, useParams } from 'react-router-dom';
import { Api } from "@services";
import { DateInBetween, FilterAlbum } from "@utils";
import { AlbumCard, AlertBar, NavBar } from "@components";

export function AlbumPage(props) {

    const { id } = useParams();
    const [alert, setAlert] = useState(null);
    let [ album, setAlbum ] = useState([]);
    let [ images, setImages ] = useState([]);
    let [ options, setOptions ] = useState([]);

    const showImages = () => {
        let t = [];
        images.forEach((singleImage, index) => {
            // let albumInfo = {
            //     name: singleAlbum.title,
            //     url: "/prova/" + singleAlbum.slug,
            //     cover: process.env.REACT_APP_DATABASE_URL + singleAlbum.cover
            // }
            t.push(<AlbumCard key={'album-'+index} className="max-h-80 md:max-h-35v" info={singleImage} options={options}/>)
        })
        return t;
    }

    useEffect(async ()=>{
        // Fetch Data
        let currentAlbum = FilterAlbum(await Api.getAlbums(), id);
        setAlbum(currentAlbum);
        setImages(currentAlbum.images);
        setOptions(await Api.getPhotoSizes());
        // Check if user is in order date of album
        const isValid = DateInBetween(album.date_available, (new Date()).toLocaleDateString('pt-PT'), album.date_finalOrder);
        if (!isValid) {
            return <Redirect push to="/" />
        }
    }, [])

    return (
        <>
            <NavBar alertBar={alert}/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">{album.title}</h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 flex-grow justify-center mx-6 md:mx-auto my-4">
                {(album === null) ? (
                    <button className="btn btn-4xl loading col-span-3"/>
                ) : showImages()}
            </div>
        </>
    );
}