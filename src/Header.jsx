import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CampContext } from '../ContextProvider';
import auth from '../firebase.config';
import { signOut } from 'firebase/auth';

const Header = () => {
    const cTInfo = useContext(CampContext);
    const [imgTitle, setImgTitle] = useState('(title)');
    const [linkDirectory, setLinkDirectory] = useState('/');
    const user = cTInfo.user;
    
    useEffect(() => {
        if (user) {
            if (cTInfo.instructor) {
                setImgTitle('(instructor)');
                setLinkDirectory('/instructor/home');
            } else {
                setImgTitle('(student)');
                setLinkDirectory('/student/home');
            }
        }
    }, [user, cTInfo.instructor])
    function logOut() {
        signOut(auth).then(() => {
            // Sign-out successful.
            cTInfo.setInstructor(false);
            if (localStorage.getItem('scs-ins-id')) {localStorage.removeItem('scs-ins-id')}
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
                    <Link to={linkDirectory}>
                        <img title={user?.displayName + imgTitle} src={user?.photoURL} className='' />
                    </Link>
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