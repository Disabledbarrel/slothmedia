import React, { createContext, useReducer } from 'react';
import { alertReducer } from '../reducers/alertReducer';

export const AlertContext = createContext();

const AlertContextProvider = (props) => {
    const [alertData, alertDispatch] = useReducer(alertReducer, []);
    return (
        <AlertContext.Provider value={{alertData, alertDispatch}}>
            {props.children}
        </AlertContext.Provider>
    );
}
 
export default AlertContextProvider;