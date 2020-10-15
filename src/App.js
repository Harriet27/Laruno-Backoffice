import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './store/reducers';
import Header from './components/Header/Header';
import './assets/scss/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// --- Pages, Component, Element --- //
import Login from './pages/Login/Login';
import AddProducts from './pages/Products/AddProducts';
import OrderOnline from './components/OrderOnline/OrderOnline';
import Topic from './pages/Topic/Topic';
import Products from './pages/Products/Products';
import ShowProduct from './components/Product/ShowProduct';
import UpdateProduct from './components/Product/UpdateProduct';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';

import Roles from './pages/Roles/Roles';
import Fullfilments from './pages/Fullfilments/Fullfilments';
import AlertDelete from './elements/Alert/AlertDelete';
import DataReseller from './components/Reseller/DataReseller';
import Order from './pages/Order/Order';
import DataCoupons from './components/Coupons/DataCoupons';
import DetailOrder from './components/OrderOnline/DetailOrder';
import MultipleImage from './components/AddProduct/MultipleImage';

export default function App() {
    return (
        <Provider store={createStore(reducers, applyMiddleware(thunk))}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>

                    <Route exact path="/dashboard">
                        <Header />
                        <Dashboard />
                    </Route>
                    <Route exact path="/add-product">
                        <Header />
                        <AddProducts />
                    </Route>
                    <Route exact path="/product">
                        <Header />
                        <Products />
                    </Route>
                    <Route exact path="/roles">
                        <Header />
                        <Roles />
                    </Route>
                    <Route exact path="/users">
                        <Header />
                        <Users />
                    </Route>
                    <Route exact path="/order">
                        <Header />
                        <Order />
                    </Route>
                    <Route exact path="/topic">
                        <Header />
                        <Topic />
                    </Route>
                    <Route exact path="/fullfilments">
                        <Header />
                        <Fullfilments />
                    </Route>

                    <Route exact path="/product/show/:id">
                        <Header />
                        <ShowProduct />
                    </Route>

                    <Route exact path="/product/update/:id">
                        <Header />
                        <UpdateProduct />
                    </Route>

                    <Route exact path="/test-components">
                        <Header />
                        <MultipleImage />
                    </Route>
                    <Route exact path="/reseller">
                        <Header />
                        <DataReseller />
                    </Route>
                    <Route exact path="/coupons">
                        <Header />
                        <DataCoupons />
                    </Route>
                    <Route exact path="/order/detail/:id">
                        <Header />
                        <DetailOrder />
                    </Route>
                    {/* --- Testing --- */}
                    <Route exact path="/testing">
                        <Header />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
}
