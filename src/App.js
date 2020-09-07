import React from "react";
import Header from "./components/Header/Header";
import "./assets/scss/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "./elements/Card/Card";
import Footer from "./components/Footer/Footer";
import ArusKas from "./components/ArusKas/ArusKas";
import CardGetData from "./elements/Card/CardGetData";
import Products from "./pages/Products/Products";
export default function App() {
    return (
        <div>
            <Header />
            <Products />
            <Footer />
        </div>
    );
}
