import React from 'react';
import { Outlet } from 'react-router-dom';
import Header1 from './Header1';
import Footer from './Footer';

const Home1 = () => {
    return (
        <div>
            <Header1 />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Home1;