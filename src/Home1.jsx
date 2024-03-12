import React from 'react';
import { Outlet } from 'react-router-dom';
import Header1 from './Header1';

const Home1 = () => {
    return (
        <div>
            <Header1 />
            <Outlet />
        </div>
    );
};

export default Home1;