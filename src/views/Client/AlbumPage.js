import React, { useEffect, useState } from "react";
import { Redirect, useParams } from 'react-router-dom';
import { Api } from "@services";
import { DateInBetween, FilterAlbum } from "@utils";
import { AlbumCard, AlertBar, NavBar } from "@components";
import { useCart } from "react-use-cart";
import { Timeout } from "@utils";

export function Album(props) {

    document.title = `A Carregar Prova | Rafael Jesus Saraiva`;

    const { id } = useParams();
    const { addItem, inCart, updateItemQuantity, getItem } = useCart();
    const [alert, setAlert] = useState(null);
    let [ album, setAlbum ] = useState([]);
    let [ images, setImages ] = useState([]);
    let [ options, setOptions ] = useState([]);

    const addImageToOrder = async (key, requestedImage, requestedSize) => {
        let itemToChangeId = requestedImage.id+'-'+requestedSize.size;
        let imageNumber = (key+1).toString().padStart(3, "0");
        let imageTitle = `${album.title} - #${imageNumber}`;
        
        if (inCart(itemToChangeId)) {
            let currentQtd = getItem(itemToChangeId);
            currentQtd = currentQtd.quantity;
            updateItemQuantity(itemToChangeId, parseInt(currentQtd+1))
        } else {
            addItem({
                id: itemToChangeId,
                name: imageTitle,
                imageId: requestedImage.id,
                imageUrl: requestedImage.url,
                size: requestedSize.size,
                sizeId: requestedSize.id,
                price: requestedSize.price
            });
        }

        setAlert(<AlertBar status="success" message={`Fotografia adicionada ao carrinho!`}/>);
        await Timeout(1500);
        setAlert(null);
    }

    const showImages = () => {
        let t = [];
        images.forEach((singleImage, index) => {
            let imageInfo = {
                id: singleImage.id,
                url: process.env.REACT_APP_DATABASE_URL+singleImage.imagePath
            }
            t.push(<AlbumCard key={'image-'+index} counter={index+1} data={imageInfo} options={options} addImage={addImageToOrder}/>)
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
        const isValid = DateInBetween(currentAlbum.date_available, (new Date()).toLocaleDateString('pt-PT'), currentAlbum.date_finalOrder);
        if (!isValid) {
            return <Redirect push to="/" />
        }
        document.title = `${currentAlbum.title} | Rafael Jesus Saraiva`;
    }, [])

    return (
        <>
            <NavBar alertBar={alert}/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">{album.title}</h2>
            <div className="masonry grid gap-6 grid-flow-row-dense grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-6 md:mx-auto my-4">
                {(album === null) ? (
                    <button className="btn btn-4xl loading col-span-3"/>
                ) : showImages()}
            </div>
        </>
    );
}