import React, { useContext, useState } from 'react';
import { CampContext } from '../ContextProvider';

const Protected = ({children}) => {
    const {user, userStatus} = useContext(CampContext);

    if (user === undefined) {return <h1>Loading..</h1>;}
    if (user === null) {return <h1>Please, login first!</h1>;}
    if (userStatus === undefined) {return <h1>Loading..</h1>;}
    if (userStatus == 'student' && children.type.name == 'Home2') {return children;}
    if (userStatus == 'instructor' && children.type.name == 'Home1') {return children;}
    if (userStatus == 'admin' && children.type.name == 'Home3') {return children;}
   
    return (
        <h1>
            Access Denied!
        </h1>
    );
};

export default Protected;