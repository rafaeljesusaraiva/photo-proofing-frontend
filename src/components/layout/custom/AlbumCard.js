import React from "react";

export function AlbumCard(props) {
    const image = props.data;
    const orderSizes = props.options;
    const addImageToOrder = props.addImage;
    const getSizes = () => {
        let t = [];
        orderSizes.forEach((element, index) => {
            t.push(
                <button key={index+1} onClick={()=>addImageToOrder(props.counter, image, element)} className="btn md:btn-sm hover:bg-base-100">
                    {element.size}
                </button>
            );
        });
        return t;
    }

    return (
        <div className="break-inside flex items-center justify-center">
            <div className=" w-80 bg-base-300 rounded-xl overflow-hidden shadow-lg">
                <img src={image.url}/>
                <div className="p-4">
                    <div className="btn-group flex-nowrap justify-center">
                        {getSizes()}
                    </div> 
                </div>
            </div>
        </div>
    );
}