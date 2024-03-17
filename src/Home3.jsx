import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header3 from './Header3';
import { CampContext } from '../ContextProvider';

const Home3 = () => {
    const {user, userStatus} = useContext(CampContext);
    
    if (user === undefined) {return <h1>Loading!!</h1>}
    if (user === null) {return <h1>Login first!!</h1>}
    if (userStatus === undefined) {return <h1>Loading!!</h1>}
    if (userStatus != 'admin') {return <h1>Access Denied!!</h1>}
    return (
        <div>
            <Header3 />
            <Outlet />
        </div>
    );
};

export default Home3;