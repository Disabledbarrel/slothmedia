import React, { Fragment, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { PlaylistContext } from '../../contexts/PlaylistContext';
import { AlertContext } from '../../contexts/AlertContext';
import { Redirect, useHistory } from 'react-router-dom';
import { createPlaylist } from '../../actions/playlist';
import { setAlert } from '../../actions/alert';


const CreatePlaylist = () => {
    // Konsumera context
    const { authData } = useContext(AuthContext);
    const { playlistDispatch } = useContext(PlaylistContext);
    const { alertDispatch } = useContext(AlertContext);

     // State
    const [ formData, setFormData] = useState({
        type: '',
        title: ''
    });

    const {
        type,
        title
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const history = useHistory();
    const onSubmit = e => {
        e.preventDefault();
        const createPlaylistResult = createPlaylist(type, title, playlistDispatch);
        createPlaylistResult.then(function(result) {
            if(result) {
                return history.push('/dashboard');
                //return <Redirect to='/dashboard' />
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
                <h2><i className="fas fa-play-circle"></i> Create Playlist</h2>
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
                    <input type="submit" className="btn btn-red" value="Create" />
                </form>
            </section>
            
        </Fragment>
    )
}

export default CreatePlaylist;
