import React from "react";
import "./card.scss";
export default function Card(props) {
    return (
        <div className="card-shadow" style={props.style}>
            {props.children}
        </div>
    );
}
