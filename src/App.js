import React from "react";
import Header from "./components/Header/Header";
import "./assets/scss/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
export default function App() {
    return (
        <div>
            <Header />
            <div style={{ padding: 1000, backgroundColor: "#F2F5F7" }}></div>
        </div>
    );
}
