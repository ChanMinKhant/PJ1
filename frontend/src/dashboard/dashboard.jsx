import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import SideBar from './sideBar';
import Nav from '../components/nav';
import ShortenUrlApp from './../pages/url/Url';
import './dashboard.css';

function Dash() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize(); // Set initial state based on window width

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='dashcon'>
      <Nav className='navv' />
      <i
        className={` sidl ${
          isOpen ? 'bi bi-x sidl1' : 'navbar brand bi bi-justify-left sidl2'
        }`}
        onClick={toggleSidebar}
      ></i>
      {/* from */}
      {/* <i
        className={` sidl ${isOpen ? 'sidl1' : 'sidl2'}`}
        onClick={toggleSidebar}
      ></i> */}

      {/* to */}
      <div className='dashcon1'>
        <div
          className={`bg-white vh-100 dashconsm ${
            isOpen ? 'sidcon' : 'sidcon1'
          }`}
        >
          <SideBar className='sidlbar' />
        </div>
        <div className={`seccon ${isOpen ? 'seccon1' : 'seccon2'}`}>
          <div className='scrollable'>
            <div className='actualscrollable'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash;
