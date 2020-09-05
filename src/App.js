import React from "react";
import "./assets/scss/style.scss";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Card from "./components/Card/Card";
import Button from "./elements/Button";
function App() {
    return (
        <div className="App">
            <Button type="button">ini tombol button</Button>
        </div>
    );
}

export default App;
