import {
    GET_SONG,
    SONG_ERROR
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