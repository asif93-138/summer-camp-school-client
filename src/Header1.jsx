import React from 'react';
import { Link } from 'react-router-dom';

const Header1 = () => {
    return (
        <div>
            <Link to='/'>Home</Link>
            <Link to='/instructor/aac'>Add a Class</Link>
            <Link to='/instructor/myclasses'>My Classes</Link>
        </div>
    );
};

export default Header1;