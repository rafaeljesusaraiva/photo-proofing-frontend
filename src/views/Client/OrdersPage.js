import React from "react";
import { NavBar } from "@components";

export function OrdersPage() {
    
    document.title = `Encomendas | Rafael Jesus Saraiva`;

    return (
        <>
            <NavBar/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Encomendas</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                <div className="w-full">Dados Encomendas</div>
            </div>
        </>
    );
}