import {
    GET_PLAYLIST,
    PLAYLIST_ERROR
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