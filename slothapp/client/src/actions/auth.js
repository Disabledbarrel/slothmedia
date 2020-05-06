import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './types';

// Login user action
export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/users/login', body, config );
        dispatch( {
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL
        });
    }
}