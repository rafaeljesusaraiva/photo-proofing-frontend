import React, { useState } from "react";
import { Link, Redirect, useHistory } from 'react-router-dom';
import { AlertBar, NavBar } from "@components";
import { MiArrowSmall } from "@components/icons"
import { Authentication } from "@services";
import { Timeout } from "@utils";
import { useCart } from "react-use-cart";

export function LoginPage() {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputExtraCss, setInputExtraCss] = useState('');
    const [inputLoading, setInputLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const { setItems } = useCart();

    let currentUser = Authentication.currentUserValue;

    if (currentUser) { 
        return <Redirect push to="/" />
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        setInputLoading(true);
        await Timeout(750);
        let newUser = await Authentication.login(email, password)
            .then(user => { return user; })
            .catch(error => {
                setAlert(<AlertBar status="error" message={error}/>);
                setInputExtraCss("input-error input-bordered");
            });

        if (newUser) {
            if (newUser.message.cart !== undefined && newUser.message.cart !== '') {
                setItems(JSON.parse(newUser.message.cart));
            }
            history.push('/')
        } else {
            setInputLoading(false);
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
                                    <MiArrowSmall className="h-6 w-6"/>
                                )}
                            </button>
                        </div>
                    </div>
                    <span className="text-sm md:text-md pt-4 pb-2 text-center">
                        Esqueceu-se da palavra-passe? <Link className="link whitespace-nowrap" to="/recuperar-password">Clique aqui</Link>
                        <br/>
                        Não tem conta? <Link className="link whitespace-nowrap" to="/signup">Registe-se</Link>
                    </span>
                </form>
            </div>
        </>
    )
}