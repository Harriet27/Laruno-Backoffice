import React from "react";
import AddProduct from "../../components/AddProduct/AddProduct";
import Layout from "../../components/AddProduct/Layout";
import Resseler from "../../components/AddProduct/Resseler";

export default function AddsProducts() {
    return (
        <div>
            <form>
                <AddProduct />
                <Layout />
                <Resseler />
                <button>on Submit</button>
            </form>
        </div>
    );
}
