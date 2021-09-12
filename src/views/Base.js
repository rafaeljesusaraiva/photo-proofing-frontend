import React from "react";
import { CartProvider } from "react-use-cart";
import { FooterBar } from "@components";

export function Base(props) {
    return (
        <CartProvider>
            <div className="md:p-10 md:pb-0 flex flex-col h-screen justify-between bg-base-200">
                {props.children}
                <FooterBar/>
            </div>
        </CartProvider>
    );
}