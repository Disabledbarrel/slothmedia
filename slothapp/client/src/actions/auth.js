import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './types';
import { setAlert } from '../actions/alert';

// Login user action
export const login = async (email, password, dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('http://localhost:5000/api/users/login', body, config );
        dispatch( {
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
}