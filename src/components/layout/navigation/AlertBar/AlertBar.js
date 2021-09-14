import React from "react";
import { MiAlert, MiCheck, MiInfoCircle, MiStop } from "@components/icons";

export function AlertBar({ status, message }) {
    // status => info | success | warning | error
    let icon;
    if (status === 'info') {
        icon = <MiInfoCircle className="h-6 w-6"/>
    } else if (status === 'success') {
        icon = <MiCheck className="h-6 w-6"/>
    } else if (status === 'warning') {
        icon = <MiAlert className="h-6 w-6"/>
    } else {
        icon = <MiStop className="h-6 w-6"/>
    }
    
    return (
        <div className={"alert z-50 bg-"+status}>
            <div className="flex-1">
                {icon}
                <span className="ml-2">{message}</span>
            </div>
        </div>
    );
}