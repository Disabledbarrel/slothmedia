import React, { Fragment, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { SongContext } from '../../contexts/SongContext';
import { getSongs, deleteSong } from '../../actions/song';
import { useParams, Link, Redirect } from 'react-router-dom';

const Playlist = () => {
    const { id } = useParams();

    // Konsumera context
    const { authData } = useContext(AuthContext);
    const { songData, songDispatch } = useContext(SongContext);

    // Läsa ut sånger
    const songs = songData.songs;
    const loading = songData.loading;

    // Hämta sånger
    useEffect(() => {
        getSongs(id, songDispatch);
    }, []);

    // Om användare inte är inloggad
    if(!authData.isAuthenticated === true && !authData.loading) {
        return <Redirect to='/' />
    }

    if(!loading && songs !== undefined) {
        return (
            <Fragment>
                <section className="container">
                        <div className="profile-container">
                            <div className="profile">
                                <p>Här ska musikspelaren renderas</p>
                            </div>
                            <section className="profile-content">
                                <h3 className="list-header"><i className="far fa-play-circle"></i> Songs</h3>
                                    
                                    { songData !== null && songs !== undefined && songs.length > 0 && songs.map(song => (
                                            <div key={song.song_id} className="list-element">
                                                <p>{song.song_name}<button onClick={e => deleteSong(id, song.song_id, songDispatch)} type="button" className="btn-delete"><i className="fas fa-trash-alt"></i></button></p>
                                            </div>
                                    ))}
    
                                <Link to={`/addsong/${id}`} className="btn btn-red btn-list" title="Go to add song">Add song</Link>
                                <Link to="/dashboard" className="btn btn-dark btn-share" title="Go back profile">Back to profile</Link>
                            </section>
                        </div> 
                    </section>
            </Fragment>
        )
    } else {
        return (
            <Fragment><h2>Inga sånger</h2></Fragment>
        )
    }
}

export default Playlist;
