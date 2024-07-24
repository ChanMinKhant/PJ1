// NotFoundPage.js

import React from 'react';
import './error.css'; // Import CSS file for styling

const NotFound = () => {
  return (
    <div className='not-found-container'>
      <h1 className='not-found-heading'>404</h1>
      <p className='not-found-message'>Oops! Page not found.</p>
      <a href="/home">home</a>
    </div>
  );
};

export default NotFound;
