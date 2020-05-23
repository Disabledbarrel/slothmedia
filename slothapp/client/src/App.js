import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreatePlaylist from './components/create-forms/CreatePlaylist';
import EditPlaylist from './components/create-forms/EditPlaylist';
import Playlist from './components/dashboard/Playlist';
import AddSong from './components/create-forms/AddSong';
import SharePlaylist from './components/create-forms/SharePlaylist';
import About from './components/about/About';
import Terms from './components/about/Terms';

// Context
import AuthContextProvider from './contexts/AuthContext';
import AlertContextProvider from './contexts/AlertContext';
import setAuthToken from './utils/setAuthToken';
import PlaylistContextProvider from './contexts/PlaylistContext';
import SongContextProvider from './contexts/SongContext';
import ShareContextProvider from './contexts/ShareContext';

import './App.css';

if(localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {

    return (
        <AuthContextProvider>
            <AlertContextProvider>
                <PlaylistContextProvider>
                    <SongContextProvider>
                        <ShareContextProvider>
                            <Router>
                                <div style={{height: '100%'}}>
                                    <Navbar />
                                    <Route exact path ='/' component={Landing} />
                                    <Fragment>
                                        <Alert />
                                        <Switch>
                                            <Route exact path="/register" component={Register} />
                                            <Route exact path="/login" component={Login} />
                                            <Route exact path="/dashboard" component={Dashboard} />
                                            <Route exact path="/createplaylist" component={CreatePlaylist} />
                                            <Route exact path="/editplaylist/:id" component={EditPlaylist} />
                                            <Route exact path="/playlist/:id" component={Playlist} />
                                            <Route exact path="/addsong/:id" component={AddSong} />
                                            <Route exact path="/shareplaylist/:id" component={SharePlaylist} />
                                            <Route exact path="/about" component={About} />
                                            <Route exact path="/terms" component={Terms} />
                                        </Switch>
                                    </Fragment>
                                </div>
                            </Router>
                        </ShareContextProvider>
                    </SongContextProvider>
                </PlaylistContextProvider>
            </AlertContextProvider>
        </AuthContextProvider>

)};
    
export default App;
