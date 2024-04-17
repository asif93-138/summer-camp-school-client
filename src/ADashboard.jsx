import React, { useContext } from 'react';
import { CampContext } from '../ContextProvider';

const ADashboard = () => {
    const {user} = useContext(CampContext);
    return (
        <div className='container text-center'>
                <h2>Admin Profile</h2>
                <img src={user.photoURL} className='img-fluid' />
                <p><b>Name :</b> {user.displayName}</p>
                <p><b>Email :</b> {user.email}</p>
        </div>
    );
};

export default ADashboard;