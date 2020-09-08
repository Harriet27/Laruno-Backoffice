import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./store/reducers";
import Header from "./components/Header/Header";
import "./assets/scss/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
// import Card from "./elements/Card/Card";
// import Footer from "./components/Footer/Footer";
// import ArusKas from "./components/ArusKas/ArusKas";
// import CardGetData from "./elements/Card/CardGetData";
import Products from "./pages/Products/Products";
import CardDataDashboard from "./elements/Card/CardDataDashboard";
// import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import AddProduct from "./components/AddProduct/AddProduct";

export default function App() {
    return (
        <Provider store={createStore(reducers, applyMiddleware(thunk))}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route exact path="/products">
                        <AddProduct />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
}
