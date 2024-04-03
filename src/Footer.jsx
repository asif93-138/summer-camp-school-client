import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="text-bg-secondary mt-5">
        <section className="d-flex align-items-center footer-flex py-3">
        <Link className="navbar-brand" to="/"><h3 className="m-0 border-end border-white p-3 px-sm-5 py-sm-4 f-b"><b>SUMMER CAMP SCHOOL</b></h3></Link>
       <article className="fl-sp">
       <p className="text-center">
        <i className="bi px-3 fs-3 bi-facebook"></i>
        <i className="bi px-3 fs-3 bi-linkedin"></i>
        <i className="bi px-3 fs-3 bi-youtube"></i>
        </p>
        <ul className="d-flex footer-links p-0">
            <li className="nav-item px-2">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link" to="/instructors">Instructors</Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link" to="/classes">Classes</Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          </ul>
       </article>
        </section>
        <p className="text-center text-bg-dark mb-0 py-2">Copyright &#169; 2024</p>
      </footer>
    );
};

export default Footer;