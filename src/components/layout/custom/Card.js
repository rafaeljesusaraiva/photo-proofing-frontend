import React from "react";
import { ConditionalLink } from "@components";

export function Card(props) {
    const cardInfo = props.info;
    return (
        <ConditionalLink to={cardInfo.url} valid={props.valid}>
            <div className={"card shadow-xl cursor-pointer md:transform hover:translate-x-1 hover:-translate-y-1 transition-transform duration-250 ease-out"+props.className}>
                <figure>
                    <img src={cardInfo.cover}/>
                </figure> 
                <div className="justify-end card-body p-4 bg-base-300 h-full">
                    <h2 className="card-title select-none">{cardInfo.name}</h2> 
                </div>
            </div> 
        </ConditionalLink>
    );
}