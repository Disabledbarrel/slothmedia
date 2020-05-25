import axios from 'axios';

import {
    GET_PLAYLIST,
    PLAYLIST_ERROR,
    DELETE_PLAYLIST
} from './types';

// Get playlist action
export const getCurrentPlaylists = async (playlistDispatch) => {
    try {
        const res = await axios.get('/api/playlists');
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
export const createPlaylist = async (title, playlistDispatch) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const body = JSON.stringify({ playlist_name: title });

    try {
        await axios.post('/api/playlists', body, config);
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
export const editPlaylist = async (id, title, playlistDispatch) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const body = JSON.stringify({ playlist_name: title });

    try {
        await axios.put(`/api/playlists/${id}`, body, config);
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

// Delete playlist action 
export const deletePlaylist = async (id, playlistDispatch) => {
    
    try {
        await axios.delete(`/api/playlists/${id}`);
        playlistDispatch({
            type: DELETE_PLAYLIST,
            payload: id
        });
    } catch (err) {
        playlistDispatch({
            type: PLAYLIST_ERROR,
            payload: { msg: err.response, status: err.response}
        });
    }
}