import React from "react";
import { Link } from "react-router-dom";

export function Card(props) {
    const cardInfo = props.info;
    return (
        <Link to={cardInfo.url}>
            <div className={"card shadow-xl cursor-pointer image-full md:transform hover:translate-x-1 hover:-translate-y-1 transition-transform duration-250 ease-out"+props.className}>
                <figure>
                    <img src={cardInfo.cover}/>
                </figure> 
                <div className="justify-end card-body h-full">
                    <h2 className="card-title select-none">{cardInfo.name}</h2> 
                </div>
            </div> 
        </Link>
    );
}