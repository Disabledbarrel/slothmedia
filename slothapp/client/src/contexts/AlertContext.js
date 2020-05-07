import React, { createContext, useReducer } from 'react';
import { alertReducer } from '../reducers/alertReducer';

export const AlertContext = createContext();

const AlertContextProvider = (props) => {
    const [alertData, dispatch] = useReducer(alertReducer, []);
    return (
        <AlertContext.Provider value={{alertData, dispatch}}>
            {props.children}
        </AlertContext.Provider>
    );
}
 
export default AlertContextProvider;