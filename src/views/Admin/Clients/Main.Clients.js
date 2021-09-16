import React from "react";
import { AdminBar, NavBar } from "@components";

export function Main(){

    document.title = `Clientes - Administração | Rafael Jesus Saraiva`;

    return (
        <>
            <NavBar/>
            <AdminBar/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Administração</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                <div className="overflow-x-auto">
                    <div className="grid grid-cols-1 md:grid-cols-5 mb-4">
                        <div className="text-xl font-bold md:col-span-4 m-4 md:m-0">
                            Lista Clientes
                        </div>
                        <button className="btn btn-primary btn-sm m-4 md:m-0">Adicionar Cliente</button> 
                    </div>
                    <table className="table w-full">
                        <thead>
                        <tr>
                            <th></th> 
                            <th>Name</th> 
                            <th>Job</th> 
                            <th>Favorite Color</th>
                        </tr>
                        </thead> 
                        <tbody>
                            <tr>
                                <th>1</th> 
                                <td>Cy Ganderton</td> 
                                <td>Quality Control Specialist</td> 
                                <td>Blue</td>
                            </tr>
                            <tr>
                                <th>2</th> 
                                <td>Hart Hagerty</td> 
                                <td>Desktop Support Technician</td> 
                                <td>Purple</td>
                            </tr>
                            <tr>
                                <th>3</th> 
                                <td>Brice Swyre</td> 
                                <td>Tax Accountant</td> 
                                <td>Red</td>
                            </tr>
                            <tr>
                                <th>4</th> 
                                <td>Marjy Ferencz</td> 
                                <td>Office Assistant I</td> 
                                <td>Crimson</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}