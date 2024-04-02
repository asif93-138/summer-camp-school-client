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
            if (cTInfo.userStatus == 'instructor') {
                setImgTitle('(instructor)');
                setLinkDirectory('/instructor/home');
            } else if (cTInfo.userStatus == 'student') {
                setImgTitle('(student)');
                setLinkDirectory('/student/home');
            } else if (cTInfo.userStatus == 'admin') {
                setImgTitle('(admin)');
                setLinkDirectory('/admin/home');
            }
            
        }
    }, [user, cTInfo.userStatus])
    
    function logOut() {
        signOut(auth).then(() => {
            // Sign-out successful.
            if (localStorage.getItem("scs-access-token")) {
                localStorage.removeItem("scs-access-token");
            }
            cTInfo.setUserStatus();
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
                    <Link to={linkDirectory}>Dashboard</Link>
                    <img title={user?.displayName + imgTitle} src={user?.photoURL} className='' />
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