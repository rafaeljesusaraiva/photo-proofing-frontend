import React from "react";
import { ConditionalLink } from "@components";
import { Authentication } from '@services';

export function Card(props) {
    const cardInfo = props.info;
    const currentUser = Authentication.currentUserValue;


    const warningNoLogin = () => {
        console.log('yo')
        props.setShowModal(cardInfo.name);
    }

    if (!currentUser) {
        return (
            <div className={"relative card shadow-xl cursor-pointer md:transform hover:translate-x-1 hover:-translate-y-1 transition-transform duration-250 ease-out"+props.className} onClick={warningNoLogin}>
                <figure>
                    <img src={cardInfo.cover} alt="Album Cover"/>
                </figure> 
                <div className="absolute bottom-0 left-0 card-body p-2 px-4 bg-black/75 w-full">
                    <h2 className="card-title select-none mb-0">{cardInfo.name}</h2> 
                </div>
            </div> 
        )
    }
    
    return (
        <ConditionalLink to={cardInfo.url} valid={props.valid}>
            <div className={"relative card shadow-xl cursor-pointer md:transform hover:translate-x-1 hover:-translate-y-1 transition-transform duration-250 ease-out"+props.className}>
                <figure>
                    <img src={cardInfo.cover} alt="Album Cover"/>
                </figure> 
                <div className="absolute bottom-0 left-0 card-body p-2 px-4 bg-black/75 w-full">
                    <h2 className="card-title select-none mb-0">{cardInfo.name}</h2> 
                </div>
            </div> 
        </ConditionalLink>
    );
}