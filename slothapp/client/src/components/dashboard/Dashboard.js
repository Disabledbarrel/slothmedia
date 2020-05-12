import React, { Fragment, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { PlaylistContext } from '../../contexts/PlaylistContext';
import { getCurrentPlaylists } from '../../actions/playlist';
import { Redirect } from 'react-router-dom';

const Dashboard = () => {
    // Konsumera context
    const { authData } = useContext(AuthContext);
    const { playlistData, playlistDispatch } = useContext(PlaylistContext);
    
    // Läsa ut playlists
    const playlists = playlistData.playlists;
    const loading = playlistData.loading;

    // Hämta inloggad användares spellistor
    useEffect(() => {
        getCurrentPlaylists(playlistDispatch);
    }, []);

    // Om användare inte är inloggad
    if(!authData.isAuthenticated === true && !authData.loading) {
        return <Redirect to='/' />
    }
    if(!loading && playlists !== undefined) {
        return (
            <Fragment>
                <section className="container">
                    <div className="profile-container">
                        <div className="profile">
                            <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y" alt="profile" className="round-img" />
                            <div className="profile-header">
                                <h2 className="container-heading"><i className="fas fa-user-circle"></i> Dashboard</h2>
                                <p>Welcome {authData.user !== null ? authData.user.user_name : ''}!</p>
                            </div>
                        </div>
                        <section className="profile-content">
                            <h3>My playlists</h3>
                                { playlistData !== null && playlists.length > 0 && playlists.map(playlist => (
                                    <div key={playlist.playlist_id} className="">
                                        <p>{playlist.playlist_name}</p>
                                    </div>
                                ))}
                            <a href="create-playlist.html" className="btn btn-red" title="Go to create playlist">Create Playlist</a>
                            <button className="btn btn-dark btn-share"><i className="fas fa-share-square"></i> Share</button>
                        </section>
                    </div> 
                </section>
            </Fragment>
        )
    } else {
        return (
            <Fragment><h2>Inga spellistor</h2></Fragment>
        )
    }
}

export default Dashboard;
