import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
// Context
import AuthContextProvider from './contexts/AuthContext';
import AlertContextProvider from './contexts/AlertContext';

import './App.css';


const App = () => 
<AuthContextProvider>
    <AlertContextProvider>
        <Router>
            <Fragment>
                <Navbar />
                <Route exact path ='/' component={Landing} />
                <Fragment>
                    <Alert />
                    <Switch>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                    </Switch>
                </Fragment>
            </Fragment>
        </Router>
    </AlertContextProvider>
</AuthContextProvider>
    
export default App;
