import React from 'react';
import { Outlet } from 'react-router-dom';
import Header2 from './Header2';
import Footer from './Footer';

const Home2 = () => {
    return (
        <div>
            <Header2 />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Home2;