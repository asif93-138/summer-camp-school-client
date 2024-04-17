import React, { useContext } from 'react';
import { CampContext } from '../ContextProvider';

const SDashboard = () => {
    const {user, userStatus} = useContext(CampContext);
   
    if (user === undefined) {return <div>Loading!!</div>}
    if (user && (userStatus == 'student')) {
        return (
            <div className='container text-center'>
               <h2 className=''>Student Profile</h2>
                <img src={user.photoURL} className='img-fluid' />
                <p><b>Name :</b> {user.displayName}</p>
                <p><b>Email :</b> {user.email}</p>
            </div>
        );
} else {
    return (
        <div>
            Access denied!
        </div>
    );
}

};

export default SDashboard;