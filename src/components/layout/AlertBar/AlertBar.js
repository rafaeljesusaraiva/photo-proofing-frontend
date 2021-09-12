import React from "react";
import { MiAlert, MiCheck, MiInfoCircle, MiStop } from "@components/icons";

export function AlertBar({ status, message }) {
    // status => info | success | warning | error
    let icon;
    if (status === 'info') {
        icon = <MiInfoCircle/>
    } else if (status === 'success') {
        icon = <MiCheck/>
    } else if (status === 'warning') {
        icon = <MiAlert/>
    } else {
        icon = <MiStop/>
    }
    
    return (
        <div className={"alert alert-"+status}>
            <div className="flex-1">
                {icon}
                <label className="ml-2">{message}</label>
            </div>
        </div>
    );
}