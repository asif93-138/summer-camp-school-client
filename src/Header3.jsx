import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header3 = () => {
    return (
                <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4"> 
                    <div className="container-fluid">
                      <Link className="navbar-brand" to="/"><b>COLLEGE OF MAGIC</b></Link>
                      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                      </button>
                      <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav ms-auto">
                          <li className="nav-item">
                            <NavLink className={({isActive}) => isActive ? "nav-link fw-bold" : "nav-link"} to="/">Home</NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink className={({isActive}) => isActive ? "nav-link fw-bold" : "nav-link"} to="/admin/manageclasses">Classes</NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink className={({isActive}) => isActive ? "nav-link fw-bold" : "nav-link"} to="/admin/manageusers">Users</NavLink>
                          </li>
                        </ul>
                      </div>
                    </div>
                </nav>
    );
};

export default Header3;