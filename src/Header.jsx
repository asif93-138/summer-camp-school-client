import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CampContext } from '../ContextProvider';
import auth from '../firebase.config';
import { signOut } from 'firebase/auth';

const Header = () => {
    const user = useContext(CampContext);
    function logOut() {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/instructors">Instructors</Link>
            <Link to="/classes">Classes</Link>
            {
                user ? <>
                    <Link to="/dashboard">Dashboard</Link>
                    <img src={user?.photoURL} className='' />
                    <Link onClick={logOut}>Logout</Link>
                </>
                    :
                    <>

                        <Link to="/login">Login</Link>
                    </>
            }


        </div>
    );
};

export default Header;