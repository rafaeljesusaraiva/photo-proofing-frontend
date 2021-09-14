import React from "react";
import { useCart } from "react-use-cart";
import { MiCross, MiEye } from "@components/icons";

export function CartTableRowSimple(props) {
    const ItemInfo = props.info;
    const openPreview = props.openPreview;
    const { removeItem, updateItemQuantity } = useCart();
    const selectCounter = () => {
        let t = [];
        for (let i=1; i<101; i++) {
            t.push(<option key={i} value={i}>{i}</option>);
        }
        return t;
    }

    return (
        <tr>
            <th className="hidden md:table-cell">1</th> 
            <td className="md:hidden">
                <img className="h-52 object-contain" src={ItemInfo.imageUrl} onClick={()=>openPreview(ItemInfo.imageUrl)}/>
            </td>
            <td className="hidden md:table-cell">{ItemInfo.name}</td> 
            <td className="text-center">
                {ItemInfo.size}
            </td>
            <td className="text-center">
                {ItemInfo.quantity}
            </td>
            <td className="hidden sm:table-cell text-center">
                {Number(ItemInfo.itemTotal).toFixed(2)} €
            </td>
            <td className="hidden md:table-cell text-center">
                <button className="btn btn-sm btn-square btn-info" onClick={()=>openPreview(ItemInfo.imageUrl)}>
                    <MiEye className="h-6 w-6"/>
                </button>
            </td> 
        </tr>
    );
}