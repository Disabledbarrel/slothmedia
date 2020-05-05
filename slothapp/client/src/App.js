import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// Context
import { AuthContext } from './contexts/AuthContext';

import './App.css';


const App = () => 
<AuthContext.Provider value={{}}>
    <Router>
        <Fragment>
            <Navbar />
            <Route exact path ='/' component={Landing} />
            <Fragment>
                <Switch>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            </Fragment>
        </Fragment>
    </Router>
</AuthContext.Provider>

export default App;
