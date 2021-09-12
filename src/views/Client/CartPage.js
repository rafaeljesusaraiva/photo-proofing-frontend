import React, { useState, useEffect } from "react";
import { AlertBar, Modal, NavBar } from "@components";
import { MiCross, MiEye } from "@components/icons";

export function CartPage() {
    const [alert, setAlert] = useState(null);
    const [imagePreview, setimagePreview] = useState({ show: false, url: null });

    const openPreview = (url) => setimagePreview({ show: true, url: url });
    const closePreview = () => setimagePreview({ show: false, url: null });

    return (
        <>
            <NavBar alertBar={alert} isPublic/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Carrinho</h2>
            <div className="overflow-x-auto flex-grow w-full md:mx-auto my-4">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className="hidden md:table-cell"></th> 
                            <th className="md:hidden">Imagem</th>
                            <th className="hidden md:table-cell">Nome</th> 
                            <th>Tam.</th> 
                            <th>Qtd.</th>
                            <th></th>
                        </tr>
                    </thead> 
                    <tbody>
                        <tr>
                            <th className="hidden md:table-cell">1</th> 
                            <td className="md:hidden">
                                <img className="h-52 object-contain" src="/img/default-user-image.png" onClick={()=>openPreview('https://picsum.photos/id/1005/400/250')}/>
                            </td>
                            <td className="hidden md:table-cell">Album - Imagem #00</td> 
                            <td>
                                10x15
                            </td>
                            <td>
                                <select className="select select-bordered">
                                    <option defaultValue>1</option> 
                                    <option>2</option> 
                                    <option>3</option> 
                                    <option>4</option>
                                </select> 
                            </td>
                            <td className="hidden md:table-cell">
                                <button className="btn btn-sm btn-square btn-info" onClick={()=>openPreview('https://picsum.photos/id/1005/400/250')}>
                                    <MiEye className="h-6 w-6"/>
                                </button>
                            </td> 
                            <td> 
                                <button className="btn btn-sm btn-square btn-error">
                                    <MiCross className="inline-block w-4 h-4 stroke-current"/>
                                </button> 
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Modal show={imagePreview.show} close={closePreview} url={imagePreview.url}/>
        </>
    );
}