import React from "react";
import Header from "./components/Header/Header";
import "./assets/scss/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "./components/Card/Card";
export default function App() {
    return (
        <div>
            <Header />
            <Card style={{ padding: 100, margin: 100 }}>Hello js</Card>
        </div>
    );
}
