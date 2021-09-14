import React, { useState, useEffect } from "react";
import { NavBar } from "@components";
import { Api } from "@services";

export function ProfilePage() {

    document.title = `Perfil | Rafael Jesus Saraiva`;

    const [userInfo, setUserInfo] = useState([]);

    useEffect(async ()=>{
        if (userInfo.length === 0) {
            setUserInfo(await Api.getSelfInformation())
        }
    }, [])

    console.log(userInfo)

    return (
        <>
            <NavBar/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Perfil</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                <div className="my-4 mb-16">
                    <div className="w-full">A Minha Conta</div>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 flex-grow justify-center mx-6 md:mx-auto my-4">
                        {(userInfo.length === 0) ? (
                            <>
                                <span>&nbsp;</span>
                                <button className="btn btn-circle loading"></button>
                                <span>&nbsp;</span>
                            </>
                        ) : (
                            <>
                                <div className="flex space-x-2">
                                    <button className="btn btn-primary bg-primary-focus border-0 no-animation disabled cursor-default">Nome</button>
                                    <input type="text" className="w-full input input-bordered focus:shadow-none" defaultValue={userInfo.name}/> 
                                </div>
                                <div className="flex space-x-2">
                                    <button className="btn btn-primary bg-primary-focus border-0 no-animation disabled cursor-default">Telemóvel</button>
                                    <input type="text" className="w-full input input-bordered focus:shadow-none" defaultValue={userInfo.phoneNumber}/> 
                                </div>
                                <div className="flex space-x-2">
                                    <button className="btn btn-primary bg-primary-focus border-0 no-animation disabled cursor-default">Email</button>
                                    <input type="text" className="w-full input input-bordered focus:shadow-none" defaultValue={userInfo.email}/> 
                                </div>
                            </>
                        )}
                    </div>
                    <button className="btn btn-active w-full">Guardar Alterações</button>
                </div>
                <div className="my-4 mb-16">
                    <div className="w-full">Mudar Palavra-passe</div>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 flex-grow justify-center mx-6 md:mx-auto my-4">
                        {(userInfo.length === 0) ? (
                            <>
                                <span>&nbsp;</span>
                                <button className="btn btn-circle loading"></button>
                                <span>&nbsp;</span>
                            </>
                        ) : (
                            <>
                                <div className="flex space-x-2">
                                    <button className="btn btn-primary bg-primary-focus border-0 no-animation disabled cursor-default">Nova Palavra-passe</button>
                                    <input type="text" className="w-full input input-bordered focus:shadow-none" defaultValue={userInfo.name}/> 
                                </div>
                                <div className="flex space-x-2">
                                    <button className="btn btn-primary bg-primary-focus border-0 no-animation disabled cursor-default">Repetir Palavra-passe</button>
                                    <input type="text" className="w-full input input-bordered focus:shadow-none" defaultValue={userInfo.phoneNumber}/> 
                                </div>
                            </>
                        )}
                    </div>
                    <button className="btn btn-active w-full">Alterar Palavra-passe</button> 
                </div>
            </div>
        </>
    );
}