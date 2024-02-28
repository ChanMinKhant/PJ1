import { useState, useEffect } from 'react';
import { verifyEmail } from '../../services/authService';
import { useParams } from 'react-router-dom';
import './css/emailVerification.css';

const EmailVerificationPage = () => {
  const [message, setMessage] = useState('');
  const { token } = useParams();
  const verify = async () => {
    try {
      const response = await verifyEmail(token);
      console.log(response);
      setMessage(response.message);
    } catch (error) {
      console.log(error.response?.data?.message);
      setMessage(error.response?.data?.message);
    }
  };
  useEffect(() => {
    verify();
  }, []);

  return (
    <div className='e-verifi'>
      <div className='e-verifi-box'>
        <h1>Email Verification</h1>
        {message === '' ? <div>Verifying...</div> : <div>{message}</div>}
      </div>
    </div>
  );
};

export default EmailVerificationPage;
