// src/Footer.js
import React from 'react';
import './Footer.css';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-section about'>
          <h2 className='logo-text'>OurCompany</h2>
          <p>
            OurCompany is your one-stop destination for all your web hosting and
            file management needs. Experience the convenience and efficiency of
            our platform today.
          </p>
          <div className='socials'>
            <a href='#'>
              <FaFacebookF />
            </a>
            <a href='#'>
              <FaTwitter />
            </a>
            <a href='#'>
              <FaInstagram />
            </a>
            <a href='#'>
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div className='footer-section links'>
          <h2>Quick Links</h2>
          <ul>
            <li>
              <a href='#'>Home</a>
            </li>
            <li>
              <a href='#'>About</a>
            </li>
            <li>
              <a href='#'>Services</a>
            </li>
            <li>
              <a href='#'>Contact</a>
            </li>
            <li>
              <a href='#'>Blog</a>
            </li>
          </ul>
        </div>

        <div className='footer-section contact'>
          <h2>Contact Us</h2>
          <ul>
            <li>
              <span>Address:</span> 123 Lanmadaw St, Pyay, Myanmar
            </li>
            <li>
              <span>Phone:</span> +123 456 7890
            </li>
            <li>
              <span>Email:</span> info@ourcompany.com
            </li>
          </ul>
        </div>
      </div>

      <div className='footer-bottom'>
        &copy; 2024 OurCompany | Designed by Nyein Chan Aung
      </div>
    </footer>
  );
};

export default Footer;
