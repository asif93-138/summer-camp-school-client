import React, { createContext, useEffect, useState } from 'react';
import auth from './firebase.config';
import { onAuthStateChanged } from 'firebase/auth';


export const CampContext = createContext();

const ContextProvider = ({children}) => {

    const [user, setUser] = useState();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
          });
        return () => {
			unsubscribe();
		}
    }, [])

    return (
        <CampContext.Provider value={user}>
            {children}
        </CampContext.Provider>
    );
};

export default ContextProvider;