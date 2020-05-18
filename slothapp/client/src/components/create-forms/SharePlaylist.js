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
        user: '',
        type: ''
    });

    const {
        user,
        type
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const history = useHistory();
    const onSubmit = e => {
        e.preventDefault();
        const sharePlaylistResult = sharePlaylist(id, user, type, shareDispatch);
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
                <h2>Share playlist: {playlists !== null ? playlists[0].playlist_name : ''}</h2>
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
                    <div className="form-group">
                        <label htmlFor="type">Type of access:</label><br />
                        <select name="type" id="type" value={type} onChange={e => onChange(e)} required>
                            <option value="read">* Select type of access</option>
                            <option value="read">Show only</option>
                            <option value="rw">Show and update</option>
                        </select>
                        <small className="form-text">Choose what access the user will have to your playlist</small>
                    </div>
                    <input type="submit" className="btn btn-red btn-create btn-creating" value="Share" />
                </form>
                <Link to="/dashboard" className="btn btn-dark btn-back btn-backwards" title="Back to profile">Back to profile</Link>
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
