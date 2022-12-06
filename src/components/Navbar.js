import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

import './navbar.css';

function Navbar() {

  const [navbarState, setNavbarState] = useState(false);

  const themeColor = '#1434A4'
  const navbarTextColor = 'rgb(170, 170, 170)'
  
  const navbarStyle = {
    display: 'flex',
    position: 'fixed',
    width: navbarState ? '1500px' : '150px',
    height: navbarState ? '1500px' : '150px',
    borderRadius: navbarState ? '50%' : '50px',
    right: navbarState ? '-750px' : '-75px',
    top: navbarState ? '-750px' : '-75px',
    backgroundColor: themeColor,
    transition: '500ms',
    zIndex: '10'
  }
  
  const navTitleStyle = {
    display: navbarState ? 'flex' : 'none',
    color: 'white',
    fontSize: '3rem',
    fontWeight: 'bold',
    position: 'fixed',
    top: '20px',
    left: '350px',
  }
  
  const FaBarsStyle = {
    position: 'fixed',
    right: '10px',
    top: '0',
    fontSize: '2.3rem',
    border: 'none',
    color: navbarTextColor,
    background: 'none',
    transition: '300ms',
    transitionDelay: navbarState ?'0ms' : '300ms',
    transform: navbarState ? 'rotateY(90deg)' : 'rotateY(0)',
  }
  
  const FaTimesStyle = {
    position: 'fixed',
    right: '10px',
    top: '0',
    fontSize: '2.3rem',
    border: 'none',
    color: navbarTextColor,
    background: 'none',
    transition: '300ms',
    transitionDelay: navbarState ?'300ms' : '0ms',
    transform: navbarState ? 'rotateY(0)' : 'rotateY(90deg)',
  }
  
  const navbarLinksStyle = {
    display: navbarState ? 'flex' : 'none',
    flexDirection: 'column',
    justifyContent: 'spaceBetween',
    position: 'fixed',
    width: '100vw',
    height: '100px',
    top: '150px',
    transform: 'translateX(350px)',
    listStyle: 'none',
  }
  
  const linkStyle = {
    textDecoration: 'none',
    color: navbarTextColor,
    fontSize: '2.3rem',
  }

  return (
    <header className="navbar-container">
      <nav style={navbarStyle} className='navbar'>
        <button style={FaBarsStyle} id='FaBars' onClick={() => {setNavbarState(!navbarState)}}><FaBars /></button>
        <button style={FaTimesStyle} id='FaTimes' onClick={() => {setNavbarState(!navbarState)}}><FaTimes/></button>
        <h1 style={navTitleStyle}>Currency converter</h1>
        <ul style={navbarLinksStyle} className='navbar-links' onClick={() => {setNavbarState(!navbarState)}}>
          <li><Link style={linkStyle} to='/'>Currency</Link></li>
          <li><Link style={linkStyle} to='/rates'>Rates</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;