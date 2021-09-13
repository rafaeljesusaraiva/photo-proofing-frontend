import React from "react";

export function AlbumCard(props) {
    const cardInfo = props.info;
    const orderSizes = props.options;
    console.log(cardInfo)
    return (
        <div className={"card bordered "+props.className}>
            <figure>
                <img src="https://picsum.photos/id/1005/400/250"/>
            </figure> 
            <div className="card-body bg-base-300">
                <h2 className="card-title">Top image
                <div className="badge mx-2 badge-secondary">NEW</div>
                </h2> 
                <p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed molestiae voluptates incidunt iure sapiente.</p> 
                <div className="justify-end card-actions">
                <button className="btn btn-secondary">More info</button>
                </div>
            </div>
        </div> 
    );
}