import React, { createContext, useReducer } from 'react';
import { shareReducer } from '../reducers/shareReducer';

export const ShareContext = createContext();

const ShareContextProvider = (props) => {
    const [shareData, shareDispatch] = useReducer(shareReducer, []);
    return (
        <ShareContext.Provider value={{shareData, shareDispatch}}>
            {props.children}
        </ShareContext.Provider>
    );
}
 
export default ShareContextProvider;