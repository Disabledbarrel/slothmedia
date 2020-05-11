import {v4 as uuid} from 'uuid';
import {
    SET_ALERT,
    REMOVE_ALERT
} from './types';

export const setAlert = (msg, alertType, alertDispatch) => {
    const id = uuid();
 
    alertDispatch ({
    type: SET_ALERT,
    payload: { msg, alertType, id}
    });
    
    setTimeout(()=> alertDispatch({ type: REMOVE_ALERT, payload: id }), 5000);

}
