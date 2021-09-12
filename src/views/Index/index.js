import React, { useState, useEffect } from "react";
import { AlertBar, NavBar } from "@components";

export function IndexPage() {
    const [alert, setAlert] = useState();

    return (
        <>
            <NavBar alertBar={alert}/>
            <div className="container flex justify-center w-full mx-auto">
                Index
            </div>
        </>
    );
}