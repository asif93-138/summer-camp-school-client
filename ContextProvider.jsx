import React, { createContext, useEffect, useState } from 'react';
import auth from './firebase.config';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';


export const CampContext = createContext();

const ContextProvider = ({children}) => {

    const [user, setUser] = useState();
    onAuthStateChanged(auth, (user) => {
        setUser(user);
      });

    return (
        <CampContext.Provider value={user}>
            {children}
        </CampContext.Provider>
    );
};

export default ContextProvider;