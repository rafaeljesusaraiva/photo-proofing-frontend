import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { AlertBar, NavBar } from "@components";
import { MiArrowSmall } from "@components/icons"
import { Authentication } from "@services";
import { Timeout } from "@utils";
import { isEmail } from "validator";

export function SignupPage() {

    const history = useHistory();
    // Form Data
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [password, setPassword] = useState("");
    // Warnings
    const [errorCss, setErrorCss] = useState('');
    const [inputLoading, setInputLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const onChangeName = (event) => { setName(event.target.value); };
    const onChangeEmail = (event) => { setEmail(event.target.value); };
    const onChangePassword = (event) => { setPassword(event.target.value); };

    let currentUser = Authentication.currentUserValue;
    if (currentUser) { 
        return <Redirect push to="/" />
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        if (emailValid) {
            setInputLoading(true);
            await Timeout(750);
            let newUser = await Authentication.registerUser(name, email, password)
                .then(user => { return user; })
                .catch(error => {
                    setAlert(<AlertBar status="error" message={error}/>);
                    setErrorCss("input-error input-bordered ");
                });
            if (newUser) {
                setAlert(<AlertBar status="success" message="Utilizador Registado! Será redirecionado para o Login dentro de momentos..."/>);
                await Timeout(4000);
                history.push('/login')
            } else {
                setInputLoading(false);
            }
        }
    }

    useEffect(() => {
        // Timeout para input do email
        const timeoutId = setTimeout(() => {
          if (!isEmail(email) && email !== '') {
            setEmailValid(false)
          } else {
            setEmailValid(true)
          }
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [email]);

    return (
        <>
            <NavBar isPublic alertBar={alert}/>
            <div className="container flex justify-center w-full mx-auto">
                {/* Form Container */}
                <form className="flex flex-col items-center w-4/5 md:w-1/2 max-w-md p-6 md:p-12 bg-neutral-focus rounded-box" onSubmit={handleSignup}>
                    <span className="text-xl font-bold py-2">
                        Registar
                    </span>
                    <div className="form-control w-full py-4">
                        <div className="flex">
                            <input type="text" placeholder="Name" className={"w-full input bg-base-200 "+errorCss} onChange={onChangeName}/>
                        </div>
                    </div>
                    <div className="form-control w-full py-4">
                        <div className="flex">
                            <input type="email" placeholder="Email" className={"w-full input bg-base-200 "+errorCss+(!emailValid ? "input-error " : "")} onChange={onChangeEmail}/>
                        </div>
                    </div>
                    <div className="form-control w-full pt-4 pb-2">
                        <div className="flex space-x-2">
                            <input type="password" placeholder="Palavra-passe" className={"w-full input bg-base-200 "+errorCss} onChange={onChangePassword}/> 
                            <button className={"btn btn-primary"+(inputLoading ? " loading" : "")} onClick={handleSignup} type="submit">
                                {inputLoading ? "" : (
                                    <MiArrowSmall className="h-6 w-6"/>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}