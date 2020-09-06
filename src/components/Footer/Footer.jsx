import React from "react";

export default function Footer() {
    return (
        <footer
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                bottom: 0,
                padding: "10px 0 0 0",
                position: "fixed",
                width: "100%",
            }}
        >
            <p style={{ textAlign: "center" }}>Copyright 2020</p>
        </footer>
    );
}
