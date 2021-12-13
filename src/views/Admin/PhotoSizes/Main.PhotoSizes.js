import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminBar, AlertBar, NavBar } from "@components";
import { AdminApi } from "@services";

export function Main(){

    document.title = `Impressões - Administração | Rafael Jesus Saraiva`;

    const [photoSizes, setPhotoSizes] = useState(null);
    const [alert, setAlert] = useState(null);

    const removeSize = async (sizeIndex) => {
        if (window.confirm("Apagar tamanho?")) {
            await AdminApi.deleteSize(sizeIndex)
                        .then(window.location.reload(false))
                        .catch(err => setAlert(<AlertBar status="error" message={err}/>));
        }
    }

    const SizeList = (photoSizes) => {
        let componentList = [];
        photoSizes.forEach((element, index) => {
            componentList.push(
                <tr key={index}>
                    <td className="text-center font-bold break-words">
                        {element.size}
                    </td> 
                    <td className="text-center select-none">
                        {Number(element.price).toFixed(2)} €
                    </td> 
                    <th className="text-center">
                        <Link to={"/administracao/impressoes/"+element.id}>
                            <button className="btn btn-primary btn-xs">Detalhes</button>
                        </Link>
                        <div className="btn btn-error btn-xs ml-4" onClick={()=>removeSize(element.id)}>Apagar</div>
                    </th>
                </tr>
            )
        });
        return componentList;
    }

    useEffect(async ()=>{
        setPhotoSizes(await AdminApi.getAllPhotoSizes());
    }, [])

    return (
        <>
            <NavBar alertBar={alert}/>
            <AdminBar/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Administração</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                <div className="overflow-x-auto">
                    <div className="text-xl font-bold mb-4 select-none">
                        Lista Impressões
                    </div>
                    <div className="overflow-x-auto">
                        { !photoSizes ? (
                            <button className="btn btn-circle loading md:col-span-3 w-full"></button>
                        ) : (
                            <table className="table w-full">
                                <thead>
                                <tr>
                                    <th className="select-none">Nome</th> 
                                    <th className="hidden sm:table-cell select-none"></th> 
                                    <th className="text-right">
                                        <Link to={"/administracao/impressoes/nova"}>
                                            <button className="btn btn-primary btn-xs">Novo Tamanho</button>
                                        </Link>
                                    </th>
                                </tr>
                                </thead> 
                                <tbody>
                                    {SizeList(photoSizes)}
                                </tbody> 
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}