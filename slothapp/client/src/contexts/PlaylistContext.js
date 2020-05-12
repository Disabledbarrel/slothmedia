import React, { createContext, useReducer } from 'react';
import { playlistReducer } from '../reducers/playlistReducer';

export const PlaylistContext = createContext();

const PlaylistContextProvider = (props) => {
    const [playlistData, playlistDispatch] = useReducer(playlistReducer, []);
    return (
        <PlaylistContext.Provider value={{playlistData, playlistDispatch}}>
            {props.children}
        </PlaylistContext.Provider>
    );
}
 
export default PlaylistContextProvider;