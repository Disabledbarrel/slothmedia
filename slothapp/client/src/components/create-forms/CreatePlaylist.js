import React, { Fragment, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { PlaylistContext } from '../../contexts/PlaylistContext';
import { AlertContext } from '../../contexts/AlertContext';
import { Redirect, useHistory, Link } from 'react-router-dom';
import { createPlaylist } from '../../actions/playlist';
import { setAlert } from '../../actions/alert';


const CreatePlaylist = () => {
    // Konsumera context
    const { authData } = useContext(AuthContext);
    const { playlistDispatch } = useContext(PlaylistContext);
    const { alertDispatch } = useContext(AlertContext);

     // State
    const [ formData, setFormData] = useState({
        title: ''
    });

    const {
        title
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const history = useHistory();
    const onSubmit = e => {
        e.preventDefault();
        const createPlaylistResult = createPlaylist(title, playlistDispatch);
        createPlaylistResult.then(function(result) {
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
            <section className="container container-img">
                <div className="form-container">
                    <h2 className="form-header"><i className="fas fa-play-circle"></i> Create Playlist</h2>
                    <form action="playlist.html" className="form" onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label><br />
                            <input type="text" id="title" name='title' value={title} onChange={e => onChange(e)}/>
                            <small className="form-text">Add a title to your playlist</small>
                        </div>
                        <input type="submit" className="btn btn-red btn-create btn-creating" value="Create" />
                    </form>
                    <Link to="/dashboard" className="btn btn-dark btn-back btn-backwards" title="Back to profile">Back to profile</Link>
                </div>
            </section>
            
        </Fragment>
    )
}

export default CreatePlaylist;
