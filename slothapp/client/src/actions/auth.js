import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load user action
export const loadUser = async (dispatch) => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }
     try {
        const res = await axios.get('http://localhost:5000/api');

        dispatch({
            type: USER_LOADED,
            payload: res.data.data[0]
        });

     } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
     }
}

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
        loadUser(dispatch);
        return true;
        
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
        return false;
    }
}

// Logout action
export const logout = (dispatch) => {

    dispatch({ type: LOGOUT});  
    
}