import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
// Context
import AuthContextProvider from './contexts/AuthContext';
import AlertContextProvider from './contexts/AlertContext';
import setAuthToken from './utils/setAuthToken';
import PlaylistContextProvider from './contexts/PlaylistContext';

import './App.css';

if(localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {

    return (
        <AuthContextProvider>
            <AlertContextProvider>
                <PlaylistContextProvider>
                    <Router>
                        <Fragment>
                            <Navbar />
                            <Route exact path ='/' component={Landing} />
                            <Fragment>
                                <Alert />
                                <Switch>
                                    <Route exact path="/register" component={Register} />
                                    <Route exact path="/login" component={Login} />
                                    <Route exact path="/dashboard" component={Dashboard} />
                                </Switch>
                            </Fragment>
                        </Fragment>
                    </Router>
                </PlaylistContextProvider>
            </AlertContextProvider>
        </AuthContextProvider>

)};
    
export default App;
