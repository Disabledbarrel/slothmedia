import React, { Fragment, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { PlaylistContext } from '../../contexts/PlaylistContext';
import { SongContext } from '../../contexts/SongContext';
import { getSongs, deleteSong } from '../../actions/song';
import { useParams, Link, Redirect } from 'react-router-dom';
import ReactPlayer from 'react-player';

const Playlist = () => {
    // State
    const [playerData, setPlayerData] = useState({
        url: '',
        playing: true,
        song_id: null 
    });
    const { url, playing, song_id } = playerData;

    const { id } = useParams();
    
    // Konsumera context
    const { authData } = useContext(AuthContext);
    const { songData, songDispatch } = useContext(SongContext);
    const { playlistData } = useContext(PlaylistContext);

    // Låtlistans namn
    const getNameById = (id, playlists) => {
        for(var i=0; i<playlists.length; i++) {
            if(playlists[i].playlist_id === parseInt(id) ) {
                return playlists[i].playlist_name;
            }
        }
    }

    // Läsa ut sånger
    const songs = songData.songs;
    const loading = songData.loading;

    // Hämta sånger
    useEffect(() => {
        getSongs(id, songDispatch);
    }, []);

    // Sätt sång-url
    const setUrl = (inurl, current_id) => {
        setPlayerData({ ...playerData, url: inurl, song_id: current_id });
    }
    // Spela nästa låt
    const playNextSong = (id) => {
        const array = songData.songs;
        for(var i=0; i<array.length; i++) {
            if(i+1 === array.length) {
                break // Stoppa loopen om man är på sista sången i spellistan
            }
            if(array[i].song_id === id ) {
                let new_id = array[i+1].song_id;
                let new_url = array[i+1].song_url;
                setUrl(new_url, new_id);
                break
            }
        }
    }

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
                                <div id="media-wrapper">
                                    <ReactPlayer
                                        className='react-player'
                                        width='100%'
                                        height='100%'
                                        playing={playing}
                                        url={url}
                                        onEnded={e => playNextSong(song_id)}
                                    />
                                </div>
                            </div>
                            <section className="profile-content">
                                <h2 className="list-header">{getNameById(id, playlistData.playlists)}</h2>
                                    
                                    { songData !== null && songs !== undefined && songs.length > 0 && songs.map(song => (
                                            <div key={song.song_id} className="list-element songs">
                                                <Link to="#!" onClick={e => setUrl(song.song_url, song.song_id)}><i className="far fa-play-circle"></i> {song.song_name}</Link><button onClick={e => deleteSong(id, song.song_id, songDispatch)} type="button" className="btn-delete"><i className="fas fa-trash-alt"></i></button>
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
