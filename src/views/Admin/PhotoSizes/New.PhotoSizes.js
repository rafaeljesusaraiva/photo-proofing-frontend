import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { AdminBar, AlertBar, NavBar } from "@components";
import { AdminApi } from "@services";

const SmallCell = (props) => {
    return (
        <th style={{paddingTop: "0.5rem", paddingBottom: "0.5rem"}} className="text-center">
            {props.children}
        </th>
    )
}

export function NewSize(props) {

    document.title = `Nova Impressão - Administração | Rafael Jesus Saraiva`;

    const history = useHistory();
    const [alert, setAlert] = useState(null);

    // Input for cost list
    const [quantity, setQuantity] = useState(null);
    const [price, setPrice] = useState(null);

    // Photo size data
    const [photoSize, setPhotoSize] = useState('');
    const [photoValue, setPhotoValue] = useState(0);
    const [costList, setCostList] = useState([]);

    const costList_itemUpdate_minQty = (old_minQty, new_minQty) => { 
        setCostList(costList.map((
            item => item.minQty !== old_minQty ? item : { minQty: new_minQty, price: item.price }
        )));    
    }
    const costList_itemUpdate_price = (minQty, new_price) => { 
        setCostList(costList.map((
            item => item.minQty !== old_minQty ? item : { minQty: minQty, price: new_price }
        )));    
    }
    const costList_itemRemove = (minQty) => {
        setCostList(costList.filter(item => item.minQty !== minQty));
        console.log('aqui')
    }

    const ShowCostList = (costList) => {
        let list = [];
        list = costList.map((element, index) => 
            <tr key={'item-'+index}>
                <th className="text-center"></th> 
                <td>
                    <input type="number" value={element.minQty} step="1" className="input bg-base-300 w-full" required={true} onChange={e=>costList_itemUpdate_minQty(element.minQty, e.target.value)}/>
                </td> 
                <td>
                    <input type="number" value={element.price} step="1" className="input bg-base-300 w-full" required={true} onChange={e=>costList_itemUpdate_price(element.minQty, e.target.value)}/>
                </td> 
                <td>
                    <div className="btn btn-error btn-sm w-full" onClick={()=>costList_itemRemove(element.minQty)}>X</div>
                </td>
            </tr>
        );
        return list;
    }
    const addNewSize = () => {
        if (quantity && price && !costList.some(item => item.minQty === quantity)) {
            setAlert(null);
            let old_costList = [...costList, {price: price, minQty: quantity}];
            setCostList(old_costList)
        } else {
            setAlert(<AlertBar status="error" message="Campos não preenchidos ou inválidos"/>);
        }
    }

    const submit = async e => {
        e.preventDefault()
        let data = {
            size: photoSize,
            price: photoValue,
            cost: costList
        }
        await AdminApi.createSize(data)
                        .then(async data => history.push('/administracao/impressoes/'))
                        .catch(err => setAlert(<AlertBar status="error" message={err}/>));
    }

    useEffect(()=>{}, [costList])

    return (
        <>
            <NavBar alertBar={alert}/>
            <AdminBar/>
            <h2 className="text-4xl mx-6 md:mx-0 my-4 select-none">Administração</h2>
            <div className="overflow-x-hidden flex-grow w-full md:mx-auto my-4">
                <div className="overflow-x-auto">
                    <div className="text-xl font-bold mb-4 select-none">
                        Novo Tamanho
                    </div>
                    <div className="overflow-x-auto">
                        <div className="card shadow-lg compact side bg-base-100">
                            <form onSubmit={submit} className="card-body grid grid-cols-2 md:grid-cols-6 gap-6">
                                <div className="form-control col-span-2 md:col-span-3">
                                    <label className="label">
                                        <span className="label-text">Tamanho</span>
                                    </label> 
                                    <input type="text" name="sizeInfo[size]" className="input bg-base-200" required={true} onChange={e=>setPhotoSize(e.target.value)}/>
                                </div>
                                <div className="form-control col-span-2 md:col-span-3">
                                    <label className="label">
                                        <span className="label-text">Preço</span>
                                    </label> 
                                    <input type="number" step=".01" name="sizeInfo[price]" className="input bg-base-200" required={true} onChange={e=>setPhotoValue(e.target.value)}/>
                                </div>
                                <div className="text-l font-bold mb-2 select-none">
                                    Lista de Tamanhos
                                </div>
                                <table className="table table-zebra col-span-full">
                                    <thead>
                                        <tr>
                                            <th></th> 
                                            <th>Qtd. Mín.</th> 
                                            <th>Custo (€)</th> 
                                            <th></th>
                                        </tr>
                                    </thead> 
                                    <tbody>                                        
                                        { !costList.length ? (
                                            <tr>
                                                <td>Nenhum Tamanho Inserido</td>
                                            </tr>
                                        ) : (
                                            ShowCostList(costList)
                                        ) }                                        
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <SmallCell>Inserir Novo</SmallCell>
                                            <SmallCell>
                                                <input type="number" placeholder="0.45" step="0.01" name="costList[numer]" className="input w-full bg-base-300" onChange={e=>setQuantity(e.target.value)} required={false}/>
                                            </SmallCell>
                                            <SmallCell>
                                                <input type="number" placeholder="0.45" step="0.01" name="costList[numer]" className="input w-full bg-base-300" onChange={e=>setPrice(e.target.value)} required={false}/>
                                            </SmallCell>
                                            <SmallCell>
                                                <a className="btn btn-primary btn-sm w-full" onClick={()=>addNewSize()}>+</a>
                                            </SmallCell>
                                        </tr>
                                    </tfoot>
                                </table>
                                <button type="submit" className="btn btn-primary">Submeter</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}