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

import OrderOnline from './components/OrderOnline/OrderOnline';
import Topic from './pages/Topic/Topic';
import Products from './pages/Products/Products';
import ShowProduct from './components/Product/ShowProduct';
import UpdateProduct from './components/Product/UpdateProduct';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';

import Roles from './pages/Roles/Roles';
import Contents from './pages/Contents/Contents';
import AlertDelete from './elements/Alert/AlertDelete';
import DataReseller from './components/Reseller/DataReseller';
import Order from './pages/Order/Order';
import DataCoupons from './components/Coupons/DataCoupons';
import DetailOrder from './components/OrderOnline/DetailOrder';

import Coupons from './pages/Coupons/Coupons';
import TestAddProduct from './pages/Products/TestAddProduct';
import Example from './pages/Testing/Premium';
import AddContents from './components/Contents/AddContents';

import Payments from './pages/Payments/Payments';

// --- PrivatePrivateRoute --- //
import PrivateRoute from './Helpers/PrivateRoute';

import AddTemplateFollowUp from './components/TemplateFollowUP/AddTemplateFollowUp';
import DataTemplateFollowUp from './components/TemplateFollowUP/DataTemplateFollowUp';
import ParentsLayoutFollowUp from './components/FollowUpOrderTemplate/ParentsLayoutFollowUp';
// import {Premium} from './pages/Testing/Premium';
export default function App() {
  return (
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>

          <PrivateRoute exact path="/dashboard">
            <Header />
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute exact path="/add-product">
            <Header />
            <TestAddProduct />
          </PrivateRoute>
          <PrivateRoute exact path="/product">
            <Header />
            <Products />
          </PrivateRoute>
          <PrivateRoute exact path="/roles">
            <Header />
            <Roles />
          </PrivateRoute>
          <PrivateRoute exact path="/users">
            <Header />
            <Users />
          </PrivateRoute>
          <PrivateRoute exact path="/order">
            <Header />
            <Order />
          </PrivateRoute>
          <PrivateRoute exact path="/topic">
            <Header />
            <Topic />
          </PrivateRoute>

          <PrivateRoute exact path="/product/show/:id">
            <Header />
            <ShowProduct />
          </PrivateRoute>

          <PrivateRoute exact path="/product/update/:id">
            <Header />
            <UpdateProduct />
          </PrivateRoute>

          <PrivateRoute exact path="/add-contents">
            <Header />
            <AddContents />
          </PrivateRoute>
          {/* <PrivateRoute exact path="test">
                        <Header />
                        <Premium />
                    </PrivateRoute> */}
          <PrivateRoute exact path="/reseller">
            <Header />
            <DataReseller />
          </PrivateRoute>
          <PrivateRoute exact path="/Contents">
            <Header />
            <Contents />
          </PrivateRoute>
          <PrivateRoute exact path="/coupons">
            <Header />
            <Coupons />
          </PrivateRoute>
          {/* test */}
          <PrivateRoute exact path="/test">
            <Header />
            <DataTemplateFollowUp />
          </PrivateRoute>

          <PrivateRoute exact path="/payments">
            <Header />
            <Payments />
          </PrivateRoute>
          <PrivateRoute exact path="/order/detail/:id">
            <Header />
            <DetailOrder />
          </PrivateRoute>
          <Route path="*">
            <div style={Styles.NotFound}>
              <h1>This Is Not WebPage You Are Looking For</h1>
              <h2>404 Not Found</h2>
            </div>
          </Route>
          {/* --- Testing --- */}
        </Switch>
      </Router>
    </Provider>
  );
}

const Styles = {
  NotFound: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
  },
};
