import React, { useContext, useState, Fragment, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { PlaylistContext } from '../../contexts/PlaylistContext';
import { AlertContext } from '../../contexts/AlertContext';
import { Redirect, useHistory, useParams, Link } from 'react-router-dom';
import { editPlaylist } from '../../actions/playlist';
import { setAlert } from '../../actions/alert';

const  EditPlaylist= () => {
    // Konsumera context
    const { authData } = useContext(AuthContext);
    const { playlistData, playlistDispatch } = useContext(PlaylistContext);
    const { alertDispatch } = useContext(AlertContext);

    const { id } = useParams();
    const integer = parseInt(id);
    const loading = playlistData.loading;

    // State
    const [ formData, setFormData] = useState({
        type: '',
        title: ''
    });

    // Fyll i formulär med tidigare värden
    useEffect(() => {
        let playlist_name = '';
        for(var i=0; i<playlistData.playlists.length; i++) {
            if(playlistData.playlists[i].playlist_id === parseInt(id) ) {
                playlist_name = playlistData.playlists[i].playlist_name;
            }
        }
        setFormData({
            title: loading || !playlistData.playlists ? '' : playlist_name
        });
    }, [loading]);

    const {
        type,
        title
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const history = useHistory();
    const onSubmit = e => {
        e.preventDefault();
        const editPlaylistResult = editPlaylist(integer, type, title, playlistDispatch);
        editPlaylistResult.then(function(result) {
            if(result) {
                return history.push('/dashboard');
            } else {
                setAlert('Create playlist failed', 'danger', alertDispatch);
            }
        });
    }

    // Om användare inte är inloggad
    if(!authData.isAuthenticated === true && !authData.loading) {
        return <Redirect to='/' />
    }

    return (
        <Fragment>
            <section className="container">
                <h2><i className="fas fa-play-circle"></i> Update Playlist</h2>
                <form action="playlist.html" className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="type">Type:</label><br />
                        <select name="type" id="type" value={type} onChange={e => onChange(e)} required>
                            <option value="0">* Select type of playlist</option>
                            <option value="false">Private</option>
                            <option value="true">Public</option>
                        </select>
                        <small className="form-text">Choose public or private playlist</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label><br />
                        <input type="text" id="title" name='title' value={title} onChange={e => onChange(e)}/>
                        <small className="form-text">Add a title to your playlist</small>
                    </div>
                    <input type="submit" className="btn btn-red btn-create" value="Update" />
                </form>
                <Link to="/dashboard" className="btn btn-dark btn-back" title="Back to profile">Back to profile</Link>
            </section>
            
        </Fragment>
    )
}

export default EditPlaylist
