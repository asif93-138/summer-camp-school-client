import React from 'react';
import { Outlet } from 'react-router-dom';
import Header2 from './Header2';

const Home2 = () => {
    return (
        <div>
            <Header2 />
            <Outlet />
        </div>
    );
};

export default Home2;