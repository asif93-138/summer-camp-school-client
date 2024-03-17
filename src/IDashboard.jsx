import React, { useContext } from 'react';
import { CampContext } from '../ContextProvider';

const IDashboard = () => {
    const {user, userStatus} = useContext(CampContext);
   
    if (user === undefined) {return <div>Loading!!</div>}
    if (user && (userStatus == 'instructor')) {
        return (
            <div>
                Instructor Dashboard
            </div>
        );
    }
    else {
        return (
            <div>
                Access denied!
            </div>
        );
    }
};

export default IDashboard;