import React from 'react';
import { Link } from 'react-router-dom';

const Header3 = () => {
    return (
        <div>
            <Link to='/'>Home</Link>
            <Link to='/admin/manageclasses'>Classes</Link>
            <Link to='/admin/manageusers'>Users</Link>
        </div>
    );
};

export default Header3;