import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router";
import queryString from 'query-string';
import { Api } from "@services";
import { Timeout } from "@utils";
import { AlertBar, NavBar } from "@components";
import { MiArrowSmall } from "@components/icons"

export function ResetPasswordPage() {

    const history = useHistory();
    const { search } = useLocation()
    const values = queryString.parse(search)
    
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordValid, setPasswordValid] = useState(true);
    const [alert, setAlert] = useState(null);
    const [inputLoading, setInputLoading] = useState(false);

    const onChangePassword = (event) => setPassword(event.target.value);
    const onChangePassword2 = (event) => setPassword2(event.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordValid && password !== "") {
            setInputLoading(true);
            await Timeout(750);
            await Api.changePassword(values.token, password)
                .then( setAlert(<AlertBar status="success" message="Palavra-passe alterada! Esta página será redirecionada para o Login dentro de momentos."/>) )
                .catch(error => {
                    setAlert(<AlertBar status="error" message={error}/>);
                });
            setInputLoading(false);
            await Timeout(3000);
            // history.push('/login')
        }
    }

    useEffect(() => {
        // Timeout para input do email
        const timeoutId = setTimeout(() => {
          if (password === password2 && password !== '') {
            setPasswordValid(true)
          } else {
            setPasswordValid(false)
          }
          if (password === '') {
              setPasswordValid(true);
          }
        }, 100);
        return () => clearTimeout(timeoutId);
    }, [password, password2]);

    return (
        <>
            <NavBar isPublic alertBar={alert}/>
            <div className="container flex justify-center w-full mx-auto">
                {/* Form Container */}
                <form className="flex flex-col items-center w-4/5 md:w-1/2 max-w-md p-6 md:p-12 bg-neutral-focus rounded-box" onSubmit={handleSubmit}>
                    <span className="text-xl font-bold py-2 whitespace-nowrap">
                        Alterar a palavra-passe
                    </span>
                    <div className="form-control w-full py-4">
                        <div className="flex">
                            <input type="password" placeholder="Palavra-passe" className={"w-full input bg-base-200 "+(!passwordValid ? "input-error " : "")} onChange={onChangePassword}/>
                        </div>
                    </div>
                    <div className="form-control w-full py-4">
                        <div className="flex">
                            <input type="password" placeholder="Repita a palavra-passe" className={"w-full input bg-base-200 "+(!passwordValid ? "input-error " : "")} onChange={onChangePassword2}/>
                        </div>
                    </div>
                    <div className="form-control w-full pt-4 pb-2">
                        <div className="flex">
                            <button className={"btn btn-primary w-full"+(inputLoading ? " loading" : "")} onClick={handleSubmit} type="submit">
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