import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router'
import { AlertBar, NavBar } from "@components";
import { Api } from "@services";
import { Timeout } from "@utils";

export function Profile() {

    document.title = `Perfil | Rafael Jesus Saraiva`;

    const history = useHistory();
    const [userInfo, setUserInfo] = useState([]);
    const [alert, setAlert] = useState(null);

    const [password1, setPassword1] = useState(false);
    const [password2, setPassword2] = useState(false);
    const [difPasswords, setDifPasswords] = useState(false);
    const updatePassword = async () => {
        if (password1 !== password2) {
            setAlert(<AlertBar status="error" message={`Palavras-passe não coincidem!`}/>);
            setDifPasswords(true);
            await Timeout(1500);
            setAlert(null);
        } else {
            setDifPasswords(false);
            let changingPassword = await Api.updatePassword(userInfo.id, password1)
            if (changingPassword.status !== 'success') {
                setAlert(<AlertBar status="error" message={`Palavras-passe não alterada! Erro: ${changingPassword.message}`}/>);
                await Timeout(1500);
                setAlert(null);
            } else {
                setAlert(<AlertBar status="success" message={`Palavra-passe alterada com sucesso!`}/>);
                await Timeout(1500);
                setAlert(null);
                history.go(0);
            }
        }
    }

    useEffect(async ()=>{
        if (userInfo.length === 0) {
            setUserInfo(await Api.getSelfInformation())
        }
    }, [])

    return (
        <>
            <NavBar alertBar={alert}/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Perfil</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                <div className="my-4 mb-16 bg-base-300 p-4 rounded-lg">
                    <div className="w-full text-xl">Os Meus Dados</div>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 flex-grow justify-center mx-6 md:mx-auto my-4">
                        {(userInfo.length === 0) ? (
                            <>
                                <span>&nbsp;</span>
                                <button tabIndex="-1" className="btn btn-circle loading"></button>
                                <span>&nbsp;</span>
                            </>
                        ) : (
                            <>
                                <div className="flex space-x-2">
                                    <button tabIndex="-1" className="btn btn-primary bg-primary-focus border-0 no-animation disabled cursor-default">Nome</button>
                                    <input tabIndex="-1" type="text" disabled={true} className="w-full input input-bordered focus:shadow-none" defaultValue={userInfo.name}/> 
                                </div>
                                <div className="flex space-x-2">
                                    <button tabIndex="-1" className="btn btn-primary bg-primary-focus border-0 no-animation disabled cursor-default">Telemóvel</button>
                                    <input tabIndex="-1" type="text" disabled={true} className="w-full input input-bordered focus:shadow-none" defaultValue={userInfo.phoneNumber}/> 
                                </div>
                                <div className="flex space-x-2">
                                    <button tabIndex="-1" className="btn btn-primary bg-primary-focus border-0 no-animation disabled cursor-default">Email</button>
                                    <input tabIndex="-1" type="text" disabled={true} className="w-full input input-bordered focus:shadow-none" defaultValue={userInfo.email}/> 
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="my-4 mb-16">
                    <div className="w-full text-xl">Mudar Palavra-passe</div>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 flex-grow justify-center mx-6 md:mx-auto my-4">
                        {(userInfo.length === 0) ? (
                            <>
                                <span>&nbsp;</span>
                                <button tabIndex="-1" className="btn btn-circle loading"></button>
                                <span>&nbsp;</span>
                            </>
                        ) : (
                            <>
                                <div className="flex space-x-2">
                                    <button tabIndex="-1" className="btn btn-primary bg-primary-focus border-0 no-animation disabled cursor-default">Nova Palavra-passe</button>
                                    <input type="password" className={"w-full input input-bordered focus:shadow-none"+(difPasswords ? " input-error" : "") } placeholder="Escrever aqui" onChange={(e)=>setPassword1(e.target.value)}/> 
                                </div>
                                <div className="flex space-x-2">
                                    <button tabIndex="-1" className="btn btn-primary bg-primary-focus border-0 no-animation disabled cursor-default">Repetir Palavra-passe</button>
                                    <input type="password" className={"w-full input input-bordered focus:shadow-none"+(difPasswords ? " input-error" : "") } placeholder="Escrever aqui" onChange={(e)=>setPassword2(e.target.value)}/> 
                                </div>
                            </>
                        )}
                    </div>
                    <button className="btn btn-active w-full" onClick={updatePassword}>Alterar Palavra-passe</button> 
                </div>
            </div>
        </>
    );
}