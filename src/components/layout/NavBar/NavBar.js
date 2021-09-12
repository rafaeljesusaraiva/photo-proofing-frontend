import React from "react";
import { MiCart } from "@components/icons";

export function NavBar(props) {
    const { isPublic, alertBar } = props;

    return (
        <div className="flex flex-col gap-y-5">
            <div className="navbar col-span-1 shadow-lg md:col-span-3 bg-neutral-focus text-neutral-content md:rounded-box">
                <div className="flex-1 px-2 mx-2">
                    <a href="/" className="text-xl font-bold">
                        Prova Fotografias
                    </a>
                </div>
                {isPublic ? '' : (
                    <div className="flex-none px-2 mx-2">
                        <div className="items-stretch hidden lg:flex">
                            <a className="btn btn-ghost btn-sm rounded-btn">
                                Conta
                            </a> 
                            <a className="btn btn-ghost btn-sm rounded-btn">
                                <MiCart/>
                                <div className="ml-2 indicator-item indicator-middle indicator-end badge badge-secondary">6</div> 
                            </a> 
                            <a className="btn btn-ghost btn-sm rounded-btn">
                                About
                            </a> 
                        </div>
                        <div className="avatar">
                            <div className="rounded-full w-10 h-10 m-1">
                                <img src="/img/default-user-image.png"/>
                            </div>
                        </div>
                    </div> 
                )}
            </div>
            <div className="relative h-0">
                {alertBar}
            </div>
        </div>
    )
}