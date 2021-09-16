import React from "react";
import { Link } from "react-router-dom";

const AdminBarButton = ({url, name}) => {
    return (
        <Link className="btn bg-base-300 border-0 flex-grow hover:bg-base-100" to={url}>{name}</Link>
    );
}

export function AdminBar() {
    return (
        <div className="btn-group bg-base-300 rounded-lg flex justify-evenly md:flex-nowrap w-full mb-6">
            <AdminBarButton url="/administracao" name="Início"/>
            <AdminBarButton url="/administracao/eventos" name="Eventos"/>
            <AdminBarButton url="/administracao/clientes" name="Clientes"/>
            <AdminBarButton url="/administracao/encomendas" name="Encomendas"/>
            <AdminBarButton url="/administracao/impressoes" name="Impressoes"/> 
        </div> 
    )
}