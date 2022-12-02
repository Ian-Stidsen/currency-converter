import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

import './navbar.css';

function Navbar() {
  let navbar;
  let navbarLinks;

  // Adds defer / delay so there isn't any problems loading the script.
  window.addEventListener("load", ()=>{
    navbar = document.getElementsByClassName('navbar')[0];
    navbarLinks = document.getElementsByClassName('navbar-links')[0];
  });

  function navToggle() {
    navbar.classList.toggle('show');
    navbarLinks.classList.toggle('show');
  };
  return (
    <header className="navbar-container">
      <nav className='navbar'>
        <button id='FaBars' onClick={navToggle}><FaBars /></button>
        <button id='FaTimes' onClick={navToggle}><FaTimes/></button>
        <ul className='navbar-links' onClick={navToggle}>
          <li><Link to='/'>Currency</Link></li>
          <li><Link to='/inflation'>Inflation</Link></li>
          <li><Link to='/rates'>Rates</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;