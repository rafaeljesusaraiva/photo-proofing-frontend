import React, { useState, useEffect } from "react";
import { AlertBar, Card, NavBar } from "@components";

export function IndexPage() {
    const [alert, setAlert] = useState();

    return (
        <>
            <NavBar alertBar={alert}/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Trabalhos Disponíveis</h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 flex-grow justify-center mx-6 md:mx-auto my-4">
                <Card className="max-h-80 md:max-h-35v"/>
                
            </div>
        </>
    );
}