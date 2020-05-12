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

