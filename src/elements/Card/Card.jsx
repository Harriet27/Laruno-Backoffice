import React from "react";
import propTypes from "prop-types";
import "./card.scss";
export default function Card(props) {
    const className = [props.className];
    if (props.isNormal) className.push("card-normal");
    if (props.isBold) className.push("card-bold");
    if (props.isLogin) className.push("card-login");
    return (
        <div className={className.join(" ")} style={props.style}>
            {props.children}
        </div>
    );
}
Card.propTypes = {
    isNormal: propTypes.bool,
    isBold: propTypes.bool,
    isLogin: propTypes.bool,
};
