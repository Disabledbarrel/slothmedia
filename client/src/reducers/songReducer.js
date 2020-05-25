import {
    GET_SONG,
    SONG_ERROR,
    DELETE_SONG
} from '../actions/types';

const initialState = {
    songs: [],
    loading: true,
    error: {}
}

export const songReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case GET_SONG:
            return {
                ...state,
                songs: payload,
                loading: false // För att inte hamna i error iom att useEffect används i komponenten
            };
        case DELETE_SONG:
            return {
                ...state,
                songs: state.songs.filter(song => song.song_id !== payload),
                loading: false
            }
        case SONG_ERROR:
            return {
                ...state, 
                error: payload,
                loading: true
            };
        default: 
        return state;
    }
}