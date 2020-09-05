import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
function Button(props) {
    // classname
    const className = [props.className];
    if (props.isPrimary) className.push("btn-primary");
    if (props.isLarge) className.push("btn-lg");
    if (props.isSmall) className.push("btn-sm");
    if (props.isBlock) className.push("btn-block");
    // belum ada di bootstrap nanti di buat dulu
    if (props.hasShadow) className.push("btn-shadow");

    // onclick
    const onClick = () => {
        if (props.onClick) props.onClick();
    };

    // disabled || loading
    if (props.isDisabled || props.isLoading) {
        if (props.isDisabled) className.push("disabled");
        return (
            <span className={className.join(" ")} style={props.style}>
                {props.isLoading ? (
                    <React.Fragment>
                        <span className="spinner-border spinner-border-sm mx-5"></span>
                        <span className="sr-only">Loading...</span>
                    </React.Fragment>
                ) : (
                    props.children
                )}
            </span>
        );
    }

    // Link
    if (props.type === "link") {
        if (props.isExternal) {
            return (
                <a
                    href={props.href}
                    className={className.join(" ")}
                    style={props.style}
                    target={props.target === "_blank" ? "_blank" : undefined}
                    rel={
                        props.target === "_blank"
                            ? "noopener noreferrer"
                            : undefined
                    }
                >
                    {props.children}
                </a>
            );
        } else {
            return (
                <Link
                    to={props.href}
                    className={className.join(" ")}
                    style={props.style}
                    onClick={onClick}
                >
                    {props.children}
                </Link>
            );
        }
    }
    return (
        <button
            className={className.join(" ")}
            style={props.style}
            onClick={onClick}
        >
            {props.children}
        </button>
    );
}

Button.propTypes = {
    type: propTypes.oneOf(["link", "button"]),
    onClick: propTypes.func,
    target: propTypes.string,
    href: propTypes.string,
    className: propTypes.string,
    isDisabled: propTypes.bool,
    isPrimary: propTypes.bool,
    isLoading: propTypes.bool,
    isSmall: propTypes.bool,
    isLarge: propTypes.bool,
    isBlock: propTypes.bool,
    isExternal: propTypes.bool,
    hasShadow: propTypes.bool,
};

export default Button;
