import axios from 'axios';

import {
    GET_PLAYLIST,
    PLAYLIST_ERROR
} from './types';

// Get playlist action
export const getCurrentPlaylists = async (playlistDispatch) => {
    try {
        const res = await axios.get('http://localhost:5000/api/playlists');
        playlistDispatch({
            type: GET_PLAYLIST,
            payload: res.data.data
        });
    } catch (err) {
        playlistDispatch({
            type: PLAYLIST_ERROR,
            payload: { msg: err.response, status: err.response}
        });
    }
}

// Create playlist action
export const createPlaylist = async (type, title, playlistDispatch) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const body = JSON.stringify({ public_type: type, playlist_name: title });

    try {
        await axios.post('http://localhost:5000/api/playlists', body, config);
        playlistDispatch({
            type: GET_PLAYLIST,
            payload: [] // För att inte skriva över med svar från API
        });
        return true;
    } catch (err) {
        
        playlistDispatch({
            type: PLAYLIST_ERROR,
            payload: { msg: err.response, status: err.response}
        });
        return false;
    }
}

// Update playlist action
export const editPlaylist = async (id, type, title, playlistDispatch) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const body = JSON.stringify({ public_type: type, playlist_name: title });

    try {
        await axios.put(`http://localhost:5000/api/playlists/${id}`, body, config);
        playlistDispatch({
            type: GET_PLAYLIST,
            payload: [] // För att inte skriva över med svar från API
        });
        return true;
    } catch (err) {
        
        playlistDispatch({
            type: PLAYLIST_ERROR,
            payload: { msg: err.response, status: err.response}
        });
        return false;
    }
}