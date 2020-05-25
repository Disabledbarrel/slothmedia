import axios from 'axios';

import {
    SHARE_PLAYLIST,
    SHARE_ERROR
} from './types';

// Get shared playlists action
export const getSharedPlaylists = async (shareDispatch) => {
    try {
        const res = await axios.get('/api/shared');
        shareDispatch({
            type: SHARE_PLAYLIST,
            payload: res.data
        });
    } catch (err) {
        shareDispatch({
            type: SHARE_ERROR,
            payload: { msg: err.response, status: err.response}
        });
    }
}

// Share playlist action
export const sharePlaylist = async (id, user_name, shareDispatch) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const body = JSON.stringify({ shared_user: user_name });

    try {
        await axios.post(`/api/playlists/${id}/share`, body, config);
        shareDispatch({
            type: SHARE_PLAYLIST,
            payload: [] // För att inte skriva över med svar från API
        });
        return true;
    } catch (err) {
        
        shareDispatch({
            type: SHARE_ERROR,
            payload: { msg: err.response, status: err.response}
        });
        return false;
    }
}