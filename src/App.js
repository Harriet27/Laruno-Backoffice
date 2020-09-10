import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./store/reducers";
import Header from "./components/Header/Header";
import "./assets/scss/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import Products from "./pages/Products/Products";
import CardDataDashboard from "./elements/Card/CardDataDashboard";
// import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import AddProduct from "./components/AddProduct/AddProduct";
import Footer from "./components/Footer/Footer";

import Layout from "./components/AddProduct/Layout";
import Nav from "./components/AddProduct/Nav";
import Resseler from "./components/AddProduct/Resseler";
import AddsProducts from "./pages/AddsProducts/AddsProducts";
export default function App() {
    return (
        <Provider store={createStore(reducers, applyMiddleware(thunk))}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route exact path="/layouts">
                        <Header />
                        <AddsProducts />
                    </Route>
                    <Route exact path="/tes-components"></Route>
                </Switch>
            </Router>
        </Provider>
    );
}
