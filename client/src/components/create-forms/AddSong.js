import React, { Fragment, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { SongContext } from '../../contexts/SongContext';
import { AlertContext } from '../../contexts/AlertContext';
import { PlaylistContext } from '../../contexts/PlaylistContext';
import { ShareContext } from '../../contexts/ShareContext';
import { Redirect, useHistory, useParams, Link } from 'react-router-dom';
import { addSong } from '../../actions/song';
import { setAlert } from '../../actions/alert';


const CreatePlaylist = () => {
    // Konsumera context
    const { authData } = useContext(AuthContext);
    const { songDispatch } = useContext(SongContext);
    const { alertDispatch } = useContext(AlertContext);
    const { playlistData } = useContext(PlaylistContext);
    const { shareData } = useContext(ShareContext);

    // Läsa ut delade spellistor
    const shared_playlists = shareData.shares;

     // State
    const [ formData, setFormData] = useState({
        song_url: '',
        song_name: ''
    });

    const {
        song_url,
        song_name
    } = formData;

    // Låtlistans namn
    const getNameById = (id, playlists, shared_lists) => {
        for(var i=0; i<playlists.length; i++) {
            if(playlists[i].playlist_id === parseInt(id) ) {
                return playlists[i].playlist_name;
            }
        }
        for(var j=0; j<shared_lists.length; j++) {
            if(shared_lists[j].playlist_id === parseInt(id) ) {
                return shared_lists[j].playlist_name;
            }
        }
    }

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
                <div className="form-container create-container">
                    <h2 className="form-header"><i className="fas fa-play-circle"></i>Add song to: {getNameById(id, playlistData.playlists, shared_playlists.data)}</h2>
                    <form className="form" onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <label htmlFor="song_name">Song name:</label><br />
                            <input type="text" id="song_name" name='song_name' value={song_name} onChange={e => onChange(e)} required/>
                            <small className="form-text">Add a song name</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="song_url">Song URL:</label><br />
                            <input type="url" id="song_url" name='song_url' value={song_url} onChange={e => onChange(e)} required/>
                            <small className="form-text">Add a link to a song (from e.g. Youtube or Soundcloud)</small>
                        </div>
                        <input type="submit" className="btn btn-red btn-create btn-creating" value="Add song" />
                    </form>
                    <Link to="/dashboard" className="btn btn-dark btn-back btn-backwards" title="Back to profile">Back to profile</Link>
                </div>
            </section>
            
        </Fragment>
    )
}

export default CreatePlaylist;