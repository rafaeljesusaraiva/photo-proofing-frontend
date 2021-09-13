import React from "react";
import { CookiesProvider } from 'react-cookie';
import { CartProvider } from "react-use-cart";
import { CookieUsage, FooterBar } from "@components";

export function Base(props) {
    return (
        <CookiesProvider>
            <CartProvider>
                <div className="md:p-10 md:pb-0 flex flex-col min-h-screen justify-between bg-base-200 relative">
                    {props.children}
                    <CookieUsage/>
                    <FooterBar/>
                </div>
            </CartProvider>
        </CookiesProvider>
    );
}