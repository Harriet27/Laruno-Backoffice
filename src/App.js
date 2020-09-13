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
import Bump from './components/AddProduct/Bump';
import StepperForm from './elements/Stepper/StepperForm';
import AddAdministrator from './components/AddAdministrator/AddAdministrator';
export default function App() {
    return (
        <Provider store={createStore(reducers, applyMiddleware(thunk))}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route exact path="/products">
                        <Header />
                        <StepperForm />
                    </Route>

                    <Route exact path="/tes-components">
                        <AddAdministrator />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
}
