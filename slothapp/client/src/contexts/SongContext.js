import React, { createContext, useReducer } from 'react';
import { songReducer } from '../reducers/songReducer';

export const SongContext = createContext();

const SongContextProvider = (props) => {
    const [songData, songDispatch] = useReducer(songReducer, []);
    return (
        <SongContext.Provider value={{songData, songDispatch}}>
            {props.children}
        </SongContext.Provider>
    );
}
 
export default SongContextProvider;