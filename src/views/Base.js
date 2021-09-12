import React from "react";
import { FooterBar } from "@components";

export function Base(props) {
    return (
        <div className="md:p-10 md:pb-0 flex flex-col h-screen justify-between bg-base-200">
            {props.children}
            <FooterBar/>
        </div>
    );
}