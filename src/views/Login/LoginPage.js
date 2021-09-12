import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { AlertBar, NavBar } from "@components";
import { MiArrowSmall } from "@components/icons"
import { Authentication } from "@services";
import { Timeout } from "@utils";

export function LoginPage() {

    const history = useHistory();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [inputExtraCss, setInputExtraCss] = useState();
    const [inputLoading, setInputLoading] = useState(false);
    const [alert, setAlert] = useState();

    let currentUser = Authentication.currentUserValue;

    if (currentUser) { 
        history.push('/');
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setInputLoading(true);
        await Timeout(750);
        await Authentication.login(email, password)
            .then(response => {
                setInputExtraCss('');
            })
            .catch(error => {
                setAlert(<AlertBar status="error" message={error}/>);
                setInputExtraCss("input-error input-bordered");
            });
        setInputLoading(false);
        
        if (currentUser) {
            history.push('/');
        }
    }

    return (
        <>
            <NavBar isPublic alertBar={alert}/>
            <div className="container flex justify-center w-full mx-auto">
                {/* Form Container */}
                <form className="flex flex-col items-center w-4/5 md:w-1/2 max-w-md p-6 md:p-12 bg-neutral-focus rounded-box" onSubmit={handleLogin}>
                    <span className="text-xl font-bold py-2">
                        Login
                    </span>
                    <div className="form-control w-full py-4">
                        <div className="flex">
                            <input type="text" placeholder="Email" className={"w-full input bg-base-200 "+inputExtraCss} onChange={e => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className="form-control w-full py-4">
                        <div className="flex space-x-2">
                            <input type="password" placeholder="Palavra-passe" className={"w-full input bg-base-200 "+inputExtraCss} onChange={e => setPassword(e.target.value)}/> 
                            <button className={"btn btn-primary"+(inputLoading ? " loading" : "")} onClick={handleLogin} type="submit">
                                {inputLoading ? "" : (
                                    <MiArrowSmall/>
                                )}
                            </button>
                        </div>
                    </div>
                    <span className="text-sm md:text-md pt-4 pb-2 text-center">
                        Esqueceu-se da palavra-passe? <a className="link whitespace-nowrap" href="/recuperar-password">Clique aqui</a>
                        <br/>
                        Não tem conta? <a className="link whitespace-nowrap" href="/registar">Registe-se</a>
                    </span>
                </form>
            </div>
        </>
    )
}