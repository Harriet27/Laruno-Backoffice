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

export default function App() {
    return (
        <Provider store={createStore(reducers, applyMiddleware(thunk))}>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route exact path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route exact path="/add-product">
                        <AddProducts />
                    </Route>
                    <Route exact path="/product">
                        <Products />
                    </Route>
                    <Route exact path="/roles">
                        <Roles />
                    </Route>
                    <Route exact path="/users">
                        <Users />
                    </Route>
                    <Route exact path="/order">
                        <OrderOnline />
                    </Route>
                    <Route exact path="/topic">
                        <Topic />
                    </Route>
                    <Route exact path="/fullfilments">
                        <Fullfilments />
                    </Route>

                    <Route exact path="/product/show/:id">
                        <ShowProduct />
                    </Route>

                    <Route exact path="/product/update/:id">
                        <UpdateProduct />
                    </Route>

                    <Route exact path="/test-components">
                        <AlertDelete />
                    </Route>
                    <Route exact path="/reseller">
                        <DataReseller />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
}
