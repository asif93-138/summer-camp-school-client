import React from 'react';
import { Link } from 'react-router-dom';

const Header2 = () => {
    return (
        <div>
            <Link to='/'>Home</Link>
            <Link to='/student/selected'>Selected Classes</Link>
            <Link to='/student/enrolled'>Enrolled Classes</Link>
            <Link to='/student/payment'>Payment History</Link>
        </div>
    );
};

export default Header2;