import { useState, useEffect } from 'react';
import { verifyEmail } from '../../services/authService';
import { useParams } from 'react-router-dom';
import './css/emailVerification.css';

const EmailVerificationPage = () => {
  const [verificationStatus, setVerificationStatus] = useState('Verifying...');

  const { token } = useParams();
  console.log(token);
  const verify = async () => {
    try {
      const response = await verifyEmail(token);
      console.log(response);
      setVerificationStatus(response.message);
    } catch (error) {
      setVerificationStatus(error?.response?.data?.message);
    }
  };
  useEffect(() => {
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
