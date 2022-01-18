import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AdminBar, NavBar } from "@components";
import { AdminApi } from "@services";

const showCosts = (showList) => {
    let allItems = [];
    showList.forEach((element, index) => {
        allItems.push(
            <tr key={index} className="hover">
                <td className="text-center">{'> '+element.minimumQuantity}</td> 
                <td className="text-center">{Number(element.price).toFixed(2)+"€ cada"}</td> 
            </tr>
        )
    });
    return allItems;
}

const SizeInfo = (props) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{props.title}</span>
            </label> 
            <input type="text" value={props.value} className="input" disabled={true}/>
        </div>
    )
}

export function ShowOne(props) {

    document.title = `Detalhes Impressão - Administração | Rafael Jesus Saraiva`;

    const [sizeInfo, setSizeInfo] = useState(null);
    let { sizeId } = useParams();

    useEffect(async ()=>{
        setSizeInfo(await AdminApi.getOneSize(sizeId));
    }, [])

    return (
        <>
            <NavBar/>
            <AdminBar/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Administração</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                <div className="overflow-x-auto">
                    <div className="text-xl font-bold mb-4 select-none">
                        Detalhes Impressão
                    </div>
                    <div className="overflow-x-auto">
                        { !sizeInfo ? (
                            <button className="btn btn-circle loading md:col-span-3 w-full"></button>
                        ) : (
                            <div className="card shadow-lg compact side bg-base-100">
                                <div className="card-body grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <SizeInfo title="Tamanho" value={sizeInfo.size}/>
                                    <SizeInfo title="Custo Cliente" value={Number(sizeInfo.price).toFixed(2)+" €"}/>
                                    <div className="collapse border rounded-box border-base-300 collapse-arrow col-span-1 md:col-span-2 w-full">
                                        <input type="checkbox"/> 
                                        <div className="collapse-title text-xl font-medium">
                                            Custo Impressão
                                        </div> 
                                        <div className="collapse-content"> 
                                            <table className="table w-full table-compact">
                                                <tbody>
                                                    {showCosts(sizeInfo.costVariations)}                                                
                                                </tbody>
                                            </table>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}