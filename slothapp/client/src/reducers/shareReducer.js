import {
    SHARE_PLAYLIST,
    SHARE_ERROR
} from '../actions/types';

const initialState = {
    shares: [],
    loading: true,
    error: {}
}

export const shareReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case SHARE_PLAYLIST:
            return {
                ...state,
                shares: payload,
                loading: false // För att inte hamna i error iom att useEffect används i komponenten
            };
        case SHARE_ERROR:
            return {
                ...state, 
                error: payload,
                loading: true
            };
        default: 
        return state;
    }
}