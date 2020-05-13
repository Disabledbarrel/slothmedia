import axios from 'axios';

import {
    GET_SONG,
    SONG_ERROR
} from './types';

// Get songs action
export const getSongs = async (id, songDispatch) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/playlists/${id}/songs`);
        songDispatch({
            type: GET_SONG,
            payload: res.data.data
        });
    } catch (err) {
        songDispatch({
            type: SONG_ERROR,
            payload: { msg: err.response, status: err.response}
        });
    }
}

// Add song action
export const addSong = async (id, song_name, song_url, songDispatch) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const body = JSON.stringify({ song_name: song_name, song_url: song_url });

    try {
        await axios.post(`http://localhost:5000/api/playlists/${id}/songs`, body, config);
        songDispatch({
            type: GET_SONG,
            payload: [] // För att inte skriva över med svar från API
        });
        return true;
    } catch (err) {
        
        songDispatch({
            type: SONG_ERROR,
            payload: { msg: err.response, status: err.response}
        });
        return false;
    }
}