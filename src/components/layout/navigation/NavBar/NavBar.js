import React from "react";
import { useHistory } from 'react-router-dom';
import { MiCart } from "@components/icons";
import { useCart } from "react-use-cart";
import { Authentication } from "@services";

export function NavBar(props) {
    const { isPublic, alertBar } = props;
    const history = useHistory();
    const { totalItems } = useCart();
    let currentUser = Authentication.currentUserValue;

    const handleLogout = async () => {
        await Authentication.logout();
        history.push('/');
    }

    return (
        <div className="flex flex-col gap-y-5">
            <div className="navbar col-span-1 shadow-lg md:col-span-3 bg-neutral-focus text-neutral-content md:rounded-box">
                <div className="flex-1 px-2 mx-2">
                    <a href="/" className="text-md md:text-xl font-bold">
                        Prova Fotografias
                    </a>
                </div>
                {isPublic ? '' : (
                    <>
                        <div className="flex-none px-2 mx-2 pr-0 mr-0">
                            <div className="items-stretch flex">
                                <a className="btn btn-ghost btn-sm rounded-btn hidden sm:inline-flex" href="/">
                                    Início
                                </a> 
                                {currentUser ? (
                                    <a className="btn btn-ghost btn-sm rounded-btn" href="/carrinho">
                                        <MiCart className="h-6 w-6"/>
                                        <div className="ml-2 indicator-item indicator-middle indicator-end badge badge-secondary">{totalItems}</div> 
                                    </a> 
                                ) : (
                                    <div className="flex-none pr-2 mr-2">
                                        <div className="items-stretch flex">
                                            <a className="btn btn-ghost btn-sm rounded-btn" href="/login">
                                                Login
                                            </a> 
                                        </div>
                                    </div> 
                                )}
                            </div>
                        </div> 
                        {currentUser ? (
                            <div className="flex-none pr-0 sm:pr-2 mr-2">
                                <div className="dropdown dropdown-end">
                                    <div tabIndex="0" className="avatar btn btn-ghost px-3">
                                        <div className="rounded-full w-10 h-10 m-1">
                                            <img src="/img/default-user-image.png"/>
                                        </div>
                                    </div>
                                    <ul tabIndex="0" className="mt-2 p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                                        <li>
                                            <a href="/perfil">Perfil</a>
                                        </li> 
                                        <li>
                                            <a href="/encomendas">Encomendas</a>
                                        </li> 
                                        <li>
                                            <a onClick={handleLogout}>Sair</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : ''}
                    </>
                )}
            </div>
            <div className="relative h-0">
                {alertBar}
            </div>
        </div>
    )
}