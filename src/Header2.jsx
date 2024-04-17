import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header2 = () => {
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
                        <NavLink className={({isActive}) => isActive ? "nav-link fw-bold" : "nav-link"} to="/student/selected">Selected Classes</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className={({isActive}) => isActive ? "nav-link fw-bold" : "nav-link"} to="/student/enrolled">Enrolled Classes</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className={({isActive}) => isActive ? "nav-link fw-bold" : "nav-link"} to="/student/payment">Payment History</NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
    );
};

export default Header2;