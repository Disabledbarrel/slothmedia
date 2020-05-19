import React, { Fragment, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { PlaylistContext } from '../../contexts/PlaylistContext';
import { ShareContext } from '../../contexts/ShareContext';
import { AlertContext } from '../../contexts/AlertContext';
import { useParams, Link, Redirect, useHistory } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { sharePlaylist } from '../../actions/share';


const SharePlaylist = () => {
    // Konsumera context
    const { authData } = useContext(AuthContext);
    const { playlistData } = useContext(PlaylistContext);
    const { alertDispatch } = useContext(AlertContext);
    const { shareDispatch } = useContext(ShareContext);

    const { id } = useParams();
 
    // Läsa ut från playlists
    const playlists = playlistData.playlists;
    const loading = playlistData.loading;

    // State
    const [ formData, setFormData] = useState({
        user: ''
    });

    const {
        user
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const history = useHistory();
    const onSubmit = e => {
        e.preventDefault();
        const sharePlaylistResult = sharePlaylist(id, user, shareDispatch);
        sharePlaylistResult.then(function(result) {
            if(result) {
                return history.push('/dashboard');
            } else {
                setAlert('Share playlist failed', 'danger', alertDispatch);
            }
        });
    }

     // Om användare inte är inloggad
     if(!authData.isAuthenticated === true && !authData.loading) {
        return <Redirect to='/' />
    }

    if(!loading && playlists !== undefined) {
        return (
            <Fragment>
               <section className="container">
                   <div className="form-container">
                    <h2 className="form-header"><i className="fas fa-play-circle"></i> Share playlist: {playlists !== null ? playlists[0].playlist_name : ''}</h2>
                    <form className="form" onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <label htmlFor="User">Username:</label><br />
                            <input
                                type="text"
                                id="User"
                                name='user'
                                value={user}
                                onChange={e => onChange(e)}
                                required  />
                                <small className="form-text">Type which user you want to share your playlist with</small>
                        </div>
                        <input type="submit" className="btn btn-red btn-create btn-creating" value="Share" />
                    </form>
                    <Link to="/dashboard" className="btn btn-dark btn-back btn-backwards" title="Back to profile">Back to profile</Link>
                </div>
            </section>
           </Fragment>
        )
    } else {
        return (
            <Fragment><h2>Något gick fel</h2></Fragment>
        )
    }
    
}

export default SharePlaylist
