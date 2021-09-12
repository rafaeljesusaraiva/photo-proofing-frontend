import React, { useState, useEffect } from "react";
import { AlertBar, Card, NavBar } from "@components";

export function AdminPage() {
    const [alert, setAlert] = useState();

    return (
        <>
            <NavBar alertBar={alert}/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Administração</h2>
            
        </>
    );
}