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
                    if (localStorage.getItem('scs-access-token')) {
                        fetch(`https://summer-camp-school-server.onrender.com/user/${user.uid}`, {
                            method: 'GET',
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('scs-access-token')}`
                            }
                        })
                        .then(res => res.json())
                        .then(data => setUserStatus(data.userStatus))
                    } else {setTimeout(function() {location.reload();}, 500)}
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