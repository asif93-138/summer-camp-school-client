import React, { createContext, useEffect, useState } from 'react';
import auth from './firebase.config';
import { onAuthStateChanged } from 'firebase/auth';


export const CampContext = createContext();

const ContextProvider = ({children}) => {
    const [instructor, setInstructor] = useState(false);
    const [user, setUser] = useState();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (user) {
                if (localStorage.getItem('scs-ins-id')) {
                    setInstructor(true);
                }
            }
          });
        return () => {
			unsubscribe();
		}
    }, [])
    
    const contextInfo = {user, instructor, setInstructor};
    return (
        <CampContext.Provider value={contextInfo}>
            {children}
        </CampContext.Provider>
    );
};

export default ContextProvider;