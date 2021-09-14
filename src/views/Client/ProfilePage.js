import React from "react";
import { NavBar } from "@components";

export function ProfilePage() {

    document.title = `Perfil | Rafael Jesus Saraiva`;

    return (
        <>
            <NavBar/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Perfil</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                <div className="w-full">Dados Conta</div>
            </div>
        </>
    );
}