// src/Gear.js
import React from 'react';
import './Gear.css';
import gearImage from '../../src/cogwheel.png';

const Gear = () => {
  return (
    <div className='gear-container'>
      <img src={gearImage} alt='Gear' className='gear' />
    </div>
  );
};

export default Gear;
