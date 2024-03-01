import React from 'react';
import './css/logout.css';
import { Link } from 'react-router-dom';

const EmailSentSuccessFully = () => {
  const message = 'Email sent successfully';

  return (
    <div className='l-out'>
      <div className='l-out-box'>
        <h1>
          Email <section></section>
        </h1>
        <h2>{message}</h2>
        <Link to='/home'>Back to Home</Link>
      </div>
    </div>
  );
};

export default EmailSentSuccessFully;
