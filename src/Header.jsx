import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
  <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4"> 
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><b>SUMMER CAMP SCHOOL</b></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="mynavbar">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "nav-link fw-bold" : "nav-link"} to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "nav-link fw-bold" : "nav-link"} to="/instructors">Instructors</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "nav-link fw-bold" : "nav-link"} to="/classes">Classes</NavLink>
        </li>
        {user && <>
            <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "nav-link fw-bold" : "nav-link"} to={linkDirectory}>Dashboard</NavLink>
        </li>
        <li className="nav-item">
          <img title={user?.displayName + imgTitle} src={user?.photoURL} className='img-fluid user-img rounded-circle mb-2 mb-sm-0 me-2' />
        </li>
        </>}

      </ul>
      {user ? 
        <button className="btn btn-outline-dark" type="button" onClick={logOut}>Logout</button>
         :
         <NavLink className={({isActive}) => isActive ? "btn btn-dark" : "btn btn-outline-dark"} to="/login">Login</NavLink>}
    
    </div>
  </div>
</nav>
    );
};

export default Header;