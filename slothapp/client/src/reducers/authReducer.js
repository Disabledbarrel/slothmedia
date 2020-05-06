import {
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false
            }
        case LOGIN_FAIL:
            return {
                ...state,
                token: null,
                loading: false
            }
        default:
            return state;
    }
    

}