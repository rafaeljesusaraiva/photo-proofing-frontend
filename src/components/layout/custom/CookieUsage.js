import React from "react";
import { useCookies } from 'react-cookie';

export function CookieUsage() {
    const [cookies, setCookie] = useCookies(['siteCookieUsage']);
    const handleCookie = () => setCookie('siteCookieUsage', true, { path: '/' });
    
    if (cookies.siteCookieUsage) {
        return '';
    }

    return (
        <div className="fixed bottom-4 right-4 flex flex-row-reverse bg-base-300 rounded-md z-50">
            <img className="w-24 mr-4 object-contain" src="/img/cookies.png"/>
            <div className="max-w-sm p-4 pr-0 ml-4 ">
                <p>Olá! <br/>Poderão estar a ser usados cookies para o funcionamento interno deste site!</p>
                <button className="btn mt-4 hover:bg-base-100" onClick={handleCookie}>Sem problema!</button>
            </div>
        </div>
    );
}