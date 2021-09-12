import React from "react";

export function Card(props) {
    return (
        <div className={"card shadow-xl cursor-pointer image-full transform hover:translate-x-1 hover:-translate-y-1 transition-transform duration-250 ease-out"+props.className}>
            <figure>
                <img src="https://picsum.photos/id/1005/400/250"/>
            </figure> 
            <div className="justify-end card-body h-full">
                <h2 className="card-title select-none">Image overlay</h2> 
                {/* <div className="card-actions">
                    <button className="btn btn-primary btn-sm">Get Started</button>
                </div> */}
            </div>
        </div> 
    );
}