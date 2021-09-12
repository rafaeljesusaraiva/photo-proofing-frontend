import React from "react";
import { MiCross } from "@components/icons";

export function Modal({ show, url, close }) {
    return (
        <div className={"modal items-center"+(show ? " modal-open" : "")}>
            <div className="modal-box overflow-hidden rounded-md relative p-0 m-8 max-w-full">
                <button className="btn btn-sm btn-square btn-error absolute right-2 top-2" onClick={close}>
                    <MiCross className="inline-block w-4 h-4 stroke-current"/>
                </button>
                <img className="w-full m-w-56" src={url}/> 
            </div>
        </div>
    );
}