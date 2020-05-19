import {
    GET_PLAYLIST,
    PLAYLIST_ERROR,
    DELETE_PLAYLIST
} from '../actions/types';

const initialState = {
    playlists: [],
    loading: true,
    error: {}
}

export const playlistReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case GET_PLAYLIST:
            return {
                ...state,
                playlists: payload,
                loading: false // För att inte hamna i error iom att useEffect används i komponenten
            };
        case DELETE_PLAYLIST:
            return {
                ...state,
                playlists: state.playlists.filter(playlist => playlist.playlist_id !== payload),
                loading: false
            }
        case PLAYLIST_ERROR:
            return {
                ...state, 
                error: payload,
                loading: true
            };
        default: 
        return state;
    }
}