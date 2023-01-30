import React, { useState, Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

import './navbar.css';

function Navbar() {
  
  const navbarFunction = () => {
    const navbar = document.getElementsByClassName('navbar')[0];
    const navbarLinks = document.getElementsByClassName('navbar-links')[0];
    navbar.classList.toggle('show');
    navbarLinks.classList.toggle('show');
  };

  return (
    <header className="navbar-container">
      <nav className='navbar'>
        <button id='FaBars' onClick={navbarFunction}><FaBars /></button>
        <button id='FaTimes' onClick={navbarFunction}><FaTimes/></button>
        <h1>Currency converter</h1>
        <ul className='navbar-links' onClick={navbarFunction}>
          <li><Link to='/'>Currency</Link></li>
          <li><Link to='/rates'>Rates</Link></li>
        </ul>
      </nav>
      <Suspense fallback='Loading...'>
        <Outlet />
      </Suspense>
    </header>
  );
}

export default Navbar;