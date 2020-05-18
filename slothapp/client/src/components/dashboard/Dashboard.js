import React, { Fragment, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { ShareContext } from '../../contexts/ShareContext';
import { PlaylistContext } from '../../contexts/PlaylistContext';
import { getCurrentPlaylists } from '../../actions/playlist';
import { getSharedPlaylists } from '../../actions/share';
import { Link, Redirect } from 'react-router-dom';

const Dashboard = () => {
    // Konsumera context
    const { authData } = useContext(AuthContext);
    const { playlistData, playlistDispatch } = useContext(PlaylistContext);
    const { shareData, shareDispatch } = useContext(ShareContext);
   
    // Läsa ut playlists
    const playlists = playlistData.playlists;
    const loading = playlistData.loading;

    // Läsa ut delade spellistor
    const shared_playlists = shareData.shares;

    // Hämta inloggad användares spellistor
    useEffect(() => {
        getCurrentPlaylists(playlistDispatch);
    }, []);

    // Hämta inloggad användares delade spellistor
    useEffect(() => {
        getSharedPlaylists(shareDispatch);
    }, []);

    // Om användare inte är inloggad
    if(!authData.isAuthenticated === true && !authData.loading) {
        return <Redirect to='/' />
    }
    if(!loading && playlists !== undefined && shared_playlists !== undefined) {
        return (
            <Fragment>
                <section className="container">
                    <div className="profile-container">
                        <div className="profile">
                            <img src={authData.user.avatar} alt="profile" className="round-img" />
                            <div className="profile-header">
                                <h2 className="container-heading"><i className="fas fa-user-circle"></i> Dashboard</h2>
                                <p>Welcome {authData.user !== null ? authData.user.user_name : ''}!</p>
                            </div>
                        </div>
                        <div className="profile-content">
                            <h3 className="list-header">My playlists</h3>
                                { playlistData !== null && playlists !== undefined && playlists.length > 0 && playlists.map(playlist => (
                                    <div key={playlist.playlist_id} className="list-element">
                                        <Link to={`/playlist/${playlist.playlist_id}`} title="Go to playlist"><i className="fas fa-compact-disc"></i> {playlist.playlist_name}</Link>
                                        <Link to={`/editplaylist/${playlist.playlist_id}`} title="Go to edit playlist"><i className="far fa-edit"></i></Link>
                                        <Link to={`/shareplaylist/${playlist.playlist_id}`} title="Share playlist"><i className="far fa-share-square"></i></Link>
                                    </div>
                                ))}
                            <Link to="/createplaylist" className="btn btn-red btn-list" title="Go to create playlist">Create Playlist</Link>
                        </div>
                    </div>
                    <div className="shared-content">
                            <div className="shared-list">
                                <h3 className="songs-header">Playlists shared with me</h3>
                                { shareData !== null && shared_playlists !== undefined && shared_playlists.data !== undefined && shared_playlists.data.length > 0 && shared_playlists.data.map(playlist => (
                                    <div key={playlist.playlist_id} className="list-element">
                                        <Link to={`/playlist/${playlist.playlist_id}`} title="Go to playlist"><i className="fas fa-compact-disc"></i> {playlist.playlist_name}</Link>
                                    </div>
                                ))}
                            </div>
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
