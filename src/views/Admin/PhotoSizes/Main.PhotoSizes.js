import React from "react";
import { AdminBar, NavBar } from "@components";

export function Main(){
    return (
        <>
            <NavBar/>
            <AdminBar/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Administração</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                <div className="w-full">Página</div>
            </div>
        </>
    );
}