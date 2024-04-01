import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header3 from './Header3';
import { CampContext } from '../ContextProvider';
import Footer from './Footer';

const Home3 = () => {
    return (
        <div>
            <Header3 />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Home3;