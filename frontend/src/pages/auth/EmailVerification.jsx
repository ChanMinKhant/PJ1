import { useState, useEffect } from 'react';
import { verifyEmail } from '../../services/authService';
import { useParams } from 'react-router-dom';
import './css/emailVerification.css';

const EmailVerificationPage = () => {
  const [verificationStatus, setVerificationStatus] = useState('Verifying...');

  const { token } = useParams();

  useEffect(() => {
    console.log('first');
    const verify = async () => {
      console.log('reached');
      try {
        const response = await verifyEmail(token);
        setVerificationStatus('Email Verified');
      } catch (error) {
        setVerificationStatus('Email Verification Failed');
      }
    };
    verify();
  }, []);

  return (
    <div className='e-verifi'>
      <div className='e-verifi-box'>
        <h1>Email Verification</h1>
        <div>{verificationStatus}</div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
