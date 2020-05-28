import React, { Fragment, useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { PlaylistContext } from '../../contexts/PlaylistContext';
import { ShareContext } from '../../contexts/ShareContext';
import { getSharedPlaylists } from '../../actions/share';
import { SongContext } from '../../contexts/SongContext';
import { getSongs, deleteSong } from '../../actions/song';
import { useParams, Link, Redirect } from 'react-router-dom';
import ReactPlayer from 'react-player';

const Playlist = () => {
    // State
    const [playerData, setPlayerData] = useState({
        url: '',
        playing: false,
        index: 0,
        seeking: false,
        played: 0
    });
    const { url, playing, index, seeking, played } = playerData;

    const { id } = useParams();
    const player = useRef(ReactPlayer);
    
    // Konsumera context
    const { authData } = useContext(AuthContext);
    const { songData, songDispatch } = useContext(SongContext);
    const { playlistData } = useContext(PlaylistContext);
    const { shareData, shareDispatch } = useContext(ShareContext);

    // Låtlistans namn
    const getNameById = (id, playlists, shared_lists) => {
        for(var i=0; i<playlists.length; i++) {
            if(playlists[i].playlist_id === parseInt(id) ) {
                return playlists[i].playlist_name;
            }
        }
        for(var j=0; j<shared_lists.length; j++) {
            if(shared_lists[j].playlist_id === parseInt(id) ) {
                return 'Shared playlist: ' + shared_lists[j].playlist_name;
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

    // Hämta inloggad användares delade spellistor
    useEffect(() => {
        getSharedPlaylists(shareDispatch);
    }, []);

    useEffect(() => {
        if(!songData.loading && songData.songs !== undefined && songData.songs.length > 0) {
            setUrl(songData.songs[0].song_url, false, 0);
        }  
    }, [songData]);
    
    // Läsa ut delade spellistor
    const shared_playlists = shareData.shares;

    // Sätt sång-url
    const setUrl = (inurl, playing, index, played) => {
        setPlayerData({ ...playerData, url: inurl, playing: playing, index: index, played: played });
    }
    // Spela/pausa
    const handlePlayPause = (playing) => {
        setPlayerData({ ...playerData, playing: !playing })
      }
    // Spela nästa låt
    const playNextSong = (index) => {
        const array = songData.songs;
        index++;
        if(index < array.length) {
            let new_url = array[index].song_url;
            setUrl(new_url, true, index, 0);
        }
    }
    // Spela föregående låt
    const playPrevSong = (index) => {
        const array = songData.songs;
        index--;
        if(index >= 0) {
            let new_url = array[index].song_url;
            setUrl(new_url, true, index, 0);
        }
    }

    // Spola i låten
    const handleSeekMouseDown = e => {
        setPlayerData({ ...playerData, seeking: true })
    }
    const handleSeekChange = e => {
        setPlayerData({ ...playerData, played: parseFloat(e.target.value) })
    }
    const handleSeekMouseUp = e => {
        setPlayerData({ ...playerData, seeking: false })
        if (player.current) {
            player.current.seekTo(parseFloat(e.currentTarget.value));
          }
    }
    const handleProgress = e => {
        if (!seeking) {
           setPlayerData({ ...playerData, played: e.played })
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
                                        ref={player}
                                        className='react-player'
                                        width='100%'
                                        height='100%'
                                        playing={playing}
                                        url={url}
                                        onEnded={e => playNextSong(index)}
                                        onProgress={e => handleProgress(e)}
                                    />
                                    <div className="player-control">
                                        <input
                                            className="slider"
                                            type='range' min={0} max={0.999999} step='any'
                                            value={played || 0}
                                            onMouseDown={e => handleSeekMouseDown(e)}
                                            onChange={e => handleSeekChange(e)}
                                            onMouseUp={e => handleSeekMouseUp(e)}
                                        />
                                        <div className="flex-btns">
                                            <button onClick={e => playPrevSong(index)} className="player-btn" title="play previous"><i className="fas fa-step-backward"></i></button>
                                            <button onClick={e => handlePlayPause(playing)} className="player-btn" title="play/pause song">{playing ? <i className="fas fa-pause-circle"></i> : <i className="fas fa-play-circle"></i>}</button>
                                            <button onClick={e => playNextSong(index)} className="player-btn" title="play next"><i className="fas fa-step-forward"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <section className="profile-content">
                                <h2 className="list-header">{getNameById(id, playlistData.playlists, shared_playlists.data)}</h2>
                                    
                                    { songData !== null && songs !== undefined && songs.length > 0 && songs.map((song, index) => (
                                            <div key={song.song_id} className="list-element songs">
                                                <Link to="#!" onClick={e => setUrl(song.song_url, true, index, 0)} className="songs-render"><i className="far fa-play-circle"></i> {song.song_name}</Link><button onClick={e => deleteSong(id, song.song_id, songDispatch)} type="button" className="btn-delete" title="Delete song"><i className="fas fa-trash-alt"></i></button>
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
