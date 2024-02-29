import React, { createContext, useEffect, useState } from 'react';
import auth from './firebase.config';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';


export const CampContext = createContext();

const ContextProvider = ({children}) => {
    useEffect(() => {
        fetch('http://localhost:3000/test')
        .then(res => res.json())
        .then(data => console.log(data))
    }, [])
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