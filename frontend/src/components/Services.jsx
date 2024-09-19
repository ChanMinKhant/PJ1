// src/Services.js
import React from 'react';
import './Services.css';
import { FaCode, FaServer, FaMobileAlt, FaShieldAlt } from 'react-icons/fa';
import Footer from './Footer';
import Nav from './Nav';

const services = [
  {
    icon: <FaCode />,
    title: 'Web Development',
    description:
      'Build and design beautiful, responsive websites tailored to your needs. Our team uses the latest technologies to create high-performance websites.',
  },
  {
    icon: <FaServer />,
    title: 'Server Management',
    description:
      'Reliable server management and maintenance to ensure your website and applications run smoothly and efficiently.',
  },
  {
    icon: <FaMobileAlt />,
    title: 'Mobile App Development',
    description:
      'Custom mobile app development for both iOS and Android platforms, providing a seamless user experience on all devices.',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Cybersecurity',
    description:
      'Protect your digital assets with our advanced cybersecurity solutions, including risk assessments and vulnerability management.',
  },
];

const Services = () => {
  return (
    <div className='services'>
      <Nav />
      <header className='services-header'>
        <h1>Our Services</h1>
        <p>
          Explore the range of services we offer to help your business thrive in
          the digital world.
        </p>
      </header>
      <div className='services-list'>
        {services.map((service, index) => (
          <div key={index} className='service-card'>
            <div className='service-icon'>{service.icon}</div>
            <h2 className='service-title'>{service.title}</h2>
            <p className='service-description'>{service.description}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Services;
