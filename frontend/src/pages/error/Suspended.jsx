import React from 'react';
import './error.css'; // Import CSS file for styling

const Suspended = () => {
  return (
    <div className='not-found-container'>
      <h1 className='not-found-heading'>Website Suspended</h1>
      <p className='not-found-message'>
        We're sorry, but the website you are trying to access has been
        suspended.
      </p>
      <p className='not-found-message'>
        Please contact support for further assistance.
      </p>
    </div>
  );
};

export default Suspended;
