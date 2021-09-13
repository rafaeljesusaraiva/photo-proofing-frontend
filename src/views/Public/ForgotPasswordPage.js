import React, { useEffect, useState } from "react";
import { AlertBar, NavBar } from "@components";
import { MiArrowSmall } from "@components/icons"
import { Api } from "@services";
import { Timeout } from "@utils";
import { isEmail } from "validator";

export function ForgotPasswordPage() {

    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [inputLoading, setInputLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const onChangeEmail = (event) => setEmail(event.target.value);

    const handleLostPassword = async (e) => {
        e.preventDefault();
        if (emailValid) {
            setInputLoading(true);
            await Timeout(750);
            await Api.resetPassword(email)
                .then( setAlert(<AlertBar status="info" message="Irá receber brevemente um email, com o link para repor a palavra-passe."/>) )
                .catch(error => {
                    setAlert(<AlertBar status="error" message={error}/>);
                });
            setInputLoading(false);
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
                <form className="flex flex-col items-center w-4/5 md:w-1/2 max-w-md p-6 md:p-12 bg-neutral-focus rounded-box" onSubmit={handleLostPassword}>
                    <span className="text-xl font-bold py-2 whitespace-nowrap">
                        Esqueci-me da Palavra-passe
                    </span>
                    <div className="form-control w-full py-4">
                        <div className="flex">
                            <input type="text" placeholder="Email" className={"w-full input bg-base-200 "+(!emailValid ? "input-error " : "")} onChange={onChangeEmail}/>
                        </div>
                    </div>
                    <div className="form-control w-full pt-4 pb-2">
                        <div className="flex">
                            <button className={"btn btn-primary w-full"+(inputLoading ? " loading" : "")} onClick={handleLostPassword} type="submit">
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