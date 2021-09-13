import React from "react";
import { useCart } from "react-use-cart";
import { MiCross, MiEye } from "@components/icons";

export function CartTableRow(props) {
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
    const removeCartItem = (itemID) => {
        removeItem(itemID);
        // toast({
        //   title: "Fotografia Removida do Carrinho!",
        //   status: "error",
        //   duration: 3000,
        //   isClosable: true,
        // })
    }

    return (
        <tr>
            <th className="hidden md:table-cell">1</th> 
            <td className="md:hidden">
                <img className="h-52 object-contain" src={ItemInfo.imageUrl} onClick={()=>openPreview(ItemInfo.imageUrl)}/>
            </td>
            <td className="hidden md:table-cell">{ItemInfo.name}</td> 
            <td>
                {ItemInfo.size}
            </td>
            <td>
                <select className="select select-bordered" value={ItemInfo.quantity} onChange={(e) => updateItemQuantity(ItemInfo.id, e.target.value)}>
                    {selectCounter()}
                </select> 
            </td>
            <td className="hidden md:table-cell">
                <button className="btn btn-sm btn-square btn-info" onClick={()=>openPreview(ItemInfo.imageUrl)}>
                    <MiEye className="h-6 w-6"/>
                </button>
            </td> 
            <td> 
                <button className="btn btn-sm btn-square btn-error" onClick={()=>removeCartItem(ItemInfo.id)}>
                    <MiCross className="inline-block w-4 h-4 stroke-current"/>
                </button> 
            </td>
        </tr>
    );
}