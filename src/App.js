import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './store/reducers';
import Header from './components/Header/Header';
import './assets/scss/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './pages/Login/Login';
import StepperForm from './elements/Stepper/StepperForm';
import AddAdministrator from './components/AddAdministrator/AddAdministrator';
import OrderOnline from './components/OrderOnline/OrderOnline';
import Topic from './pages/Topic/Topic';
import Products from './pages/Products/Products';
import ShowProduct from './components/Product/ShowProduct';
import UpdateProduct from './components/Product/UpdateProduct';
import Testing from './components/AddAdministrator/Testing';

export default function App() {
    return (
        <Provider store={createStore(reducers, applyMiddleware(thunk))}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route exact path="/add-product">
                        <Header />
                        <StepperForm />
                    </Route>
                    <Route exact path="/product">
                        <Header />
                        <Products />
                    </Route>
                    <Route exact path="/add-administrator">
                        <AddAdministrator />
                        <Testing />
                        {/* <DetailProduct />
                        {/* add new adiministrator succes */}
                        {/* <AddAdministrator /> */}
                        {/* add new topic succes */}
                        {/* <AddNewTopic />  */}
                    </Route>

                    <Route exact path="/order">
                        <Header />
                        <OrderOnline />
                    </Route>
                    <Route exact path="/topic">
                        <Header />
                        <Topic />
                    </Route>

                    <Route exact path="/product/show/:id">
                        <Header />
                        <ShowProduct />
                    </Route>

                    <Route exact path="/product/show/:id">
                        <Header />
                        <UpdateProduct />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
}
