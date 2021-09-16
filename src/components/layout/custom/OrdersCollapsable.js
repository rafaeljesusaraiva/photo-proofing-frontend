import React from "react";
import { Api } from "@services";
import { MiDownload, MiEye } from "@components/icons";

const compressOrderList = (bigList) => {
    let items = [], currentProductTotal = 0, currentProductCount = 1, currentProduct = -1;
    bigList.forEach((element, index) => {
        if (currentProduct === -1) {
            currentProduct = element;
            currentProductCount = 1;
            currentProductTotal = element.price;
            if (bigList.length === 1) {
                items.push({
                    previewLink: process.env.REACT_APP_DATABASE_URL + '/public/album/' + currentProduct.albumSlug + '/' + currentProduct.item,
                    downloadLink: process.env.REACT_APP_DATABASE_URL + '/delivery/' + currentProduct.albumSlug + '/' + currentProduct.item,
                    name: currentProduct.albumTitle,
                    size: currentProduct.size,
                    price: currentProductTotal,
                    quantity: currentProductCount,
                    imageName: currentProduct.item
                });
            }
            return;
        } 
        if (element.item === currentProduct.item && element.size === currentProduct.size && bigList.length > 1 && index !== 0) {
            currentProductTotal += currentProduct.price;
            currentProductCount += 1;
            if (items.length === 0 && index === bigList.length-1) {
                items.push({
                    previewLink: process.env.REACT_APP_DATABASE_URL + '/public/album/' + currentProduct.albumSlug + '/' + currentProduct.item,
                    downloadLink: process.env.REACT_APP_DATABASE_URL + '/delivery/' + currentProduct.albumSlug + '/' + currentProduct.item,
                    name: currentProduct.albumTitle,
                    size: currentProduct.size,
                    price: currentProductTotal,
                    quantity: currentProductCount,
                    imageName: currentProduct.item
                });
            }
            return;
        } 
        items.push({
            previewLink: process.env.REACT_APP_DATABASE_URL + '/public/album/' + currentProduct.albumSlug + '/' + currentProduct.item,
            downloadLink: process.env.REACT_APP_DATABASE_URL + '/delivery/' + currentProduct.albumSlug + '/' + currentProduct.item,
            name: currentProduct.albumTitle,
            size: currentProduct.size,
            price: currentProductTotal,
            quantity: currentProductCount,
            imageName: currentProduct.item
        });
        currentProduct = element;
        currentProductTotal = currentProduct.price;
        currentProductCount = 1;
    });
    return items;
}

const countProducts = (products) => {
    let itemCount = 0;
    products.forEach(element => {
        itemCount += element.quantity;
    });
    return itemCount;
}

export function OrdersCollapsable({ orderData, openPreview }) {

    const orderNumber = "" + orderData.orderCount;
    const prettyProducts = compressOrderList(orderData.products);
    const totalItems = countProducts(prettyProducts);
    let currentState = () => {
        let status = orderData.status;
        switch (status) {
            case 'Por Pagar':
                return (<div className="badge badge-primary">{status}</div>);
            case 'A Processar':
                return (<div className="badge badge-accent">{status}</div>);
            case 'Em Entrega':
                return (<div className="badge badge-accent">{status}</div>);
            case 'Entregue':
                return (<div className="badge badge-ghost">{status}</div>);
            case 'Cancelada':
                return (<div className="badge badge-error">{status}</div>);
            
            default:
                return (<div className="badge">Recebida</div>);
        } 
    }
    const downloadImage = async (apiUrl, imageName, orderID) => {
        const blob = await Api.getFinalImage(apiUrl, orderID)
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = imageName; //or any other extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    const downloadZip = async (orderID) => {
        const blob = await Api.getOrderZip(orderID)
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `encomenda${orderNumber.toString().padStart(4, '0')}_entregaDigital.zip`; //or any other extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div tabIndex="0" className="collapse bg-base-100 border rounded-box border-base-300 collapse-arrow w-full mb-4"> 
            <input type="checkbox"/> 
            <div className="collapse-title text-xl font-medium">
                Encomenda #{orderNumber.toString().padStart(4, '0')} - {currentState()}
            </div> 
            <div className="collapse-content"> 
                <div className="w-full font-bold mb-2">Resumo do Pedido</div>
                <table className="table w-full table-compact p-2 rounded-md">
                    <thead>
                        <tr>
                            <th className="text-center">#</th>
                            <th>Fotografia</th>
                            <th className="text-center">Tam.</th>
                            <th className="text-center">Qtd.</th>
                            <th className="text-center hidden md:table-cell">Valor</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="rounded-md">
                        {prettyProducts.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <th className="rounded-l-md text-center">{index+1}</th> 
                                    <td>{element.name}</td> 
                                    <td className="text-center">{element.size}</td> 
                                    <td className="text-center">{element.quantity}</td>
                                    <td className="text-center hidden md:table-cell">{Number(element.price).toFixed(2)} €</td> 
                                    <td className="rounded-r-md text-center">
                                        <button className="btn btn-sm btn-square btn-info mr-2" onClick={()=>openPreview(element.previewLink)}>
                                            <MiEye className="h-6 w-6"/>
                                        </button>
                                        <button className="btn btn-sm btn-square btn-info" onClick={()=>downloadImage(element.downloadLink, element.imageName, orderData.id)}>
                                            <MiDownload className="h-6 w-6"/>
                                        </button>
                                    </td> 
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th className="text-center">{totalItems}</th>
                            <th className="text-center hidden md:table-cell">{Number(orderData.totalNoPromotion).toFixed(2) + " €"}</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
                <div className="w-full font-bold my-2 text-right">
                    {(orderData.promotion !== null) ? (
                        "Valor Final (c/ desconto):  " + Number((orderData.promotion.discount !== null)
                                                ? (orderData.totalNoPromotion * (1 - orderData.promotion.discount))
                                                : (orderData.totalNoPromotion - orderData.promotion.value)
                                            ).toFixed(2) + " €"
                    ) : (
                        "Valor Final:  " + Number(orderData.totalNoPromotion).toFixed(2) + " €"
                    )}
                </div>
                <button className="btn btn-sm btn-info my-4" onClick={()=>downloadZip(orderData.id)}>
                    Descarregar Imagens
                </button>
                <div className="form-control mb-2">
                    <label className="label">
                        <span className="label-text font-bold">Notas Encomenda</span>
                    </label> 
                    <textarea className="textarea min-h-8 textarea-bordered w-50" placeholder="Nenhuma nota fornecida" disabled={true} value={orderData.note ? orderData.note : ""}></textarea>
                </div>
            </div>
        </div> 
    );
}