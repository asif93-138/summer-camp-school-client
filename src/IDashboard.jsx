import React, { useContext } from 'react';
import { CampContext } from '../ContextProvider';

const IDashboard = () => {
    const {user, userStatus} = useContext(CampContext);
   
    if (user === undefined) {return <div>Loading!!</div>}
    if (user && (userStatus == 'instructor')) {
        return (
            <div className='container text-center'>
               <h2 className=''>Instructor Profile</h2>
                <img src={user.photoURL} className='img-fluid' />
                <p><b>Name :</b> {user.displayName}</p>
                <p><b>Email :</b> {user.email}</p>
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