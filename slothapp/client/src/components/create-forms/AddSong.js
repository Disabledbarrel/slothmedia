import React, { Fragment, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { SongContext } from '../../contexts/SongContext';
import { AlertContext } from '../../contexts/AlertContext';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { addSong } from '../../actions/song';
import { setAlert } from '../../actions/alert';


const CreatePlaylist = () => {
    // Konsumera context
    const { authData } = useContext(AuthContext);
    const { songDispatch } = useContext(SongContext);
    const { alertDispatch } = useContext(AlertContext);

     // State
    const [ formData, setFormData] = useState({
        song_url: '',
        song_name: ''
    });

    const {
        song_url,
        song_name
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const { id } = useParams();

    const history = useHistory();
    const onSubmit = e => {
        e.preventDefault();
        const addSongResult = addSong(id, song_name, song_url, songDispatch);
        addSongResult.then(function(result) {
            if(result) {
                return history.push(`/playlist/${id}`);
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
                <h2><i className="fas fa-play-circle"></i> Add song to playlist:</h2>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="song_name">Song name:</label><br />
                        <input type="text" id="song_name" name='song_name' value={song_name} onChange={e => onChange(e)} required/>
                        <small className="form-text">Add a song name</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="song_url">Song url:</label><br />
                        <input type="url" id="song_url" name='song_url' value={song_url} onChange={e => onChange(e)} required/>
                        <small className="form-text">Add a link to a song (from Youtube or Soundcloud)</small>
                    </div>
                    <input type="submit" className="btn btn-red" value="Create" />
                </form>
            </section>
            
        </Fragment>
    )
}

export default CreatePlaylist;