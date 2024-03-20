import React, { createContext, useEffect, useState } from 'react';
import auth from './firebase.config';
import { onAuthStateChanged } from 'firebase/auth';


export const CampContext = createContext();

const ContextProvider = ({children}) => {
    const [userStatus, setUserStatus] = useState();
    const [user, setUser] = useState();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (user) {
                fetch(`http://localhost:3000/user/${user.uid}`)
                .then(res => res.json())
                .then(data => setUserStatus(data.userStatus))
            }
          });
        return () => {
			unsubscribe();
		}
    }, [])
    
    const contextInfo = {user, userStatus, setUserStatus};
    return (
        <CampContext.Provider value={contextInfo}>
            {children}
        </CampContext.Provider>
    );
};

export default ContextProvider;