import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../services/authService';
import './css/resetPW.css';

const ResetPassword = () => {
  const { token } = useParams();
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const password = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    console.log(password, confirmPassword);
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Assuming resetPassword returns a success message on successful password reset
      const response = await resetPassword(token, password, confirmPassword);
      setSuccessMessage(response.message);
    } catch (error) {
      console.log(error);
      setError(
        error?.response?.data?.message || 'An error occurred. Please try again.'
      );
    }
  };

  return (
    <div className='r-pw-box'>
      
      <form onSubmit={handleResetPassword} className='r-pw'>
        <fieldset><legend><h1>Reset Password</h1></legend>
        <ul>
        <li><label htmlFor='password'>New Password</label>
        <input
          type='password'
          id='password'
          ref={newPasswordRef}
          placeholder='Enter new password'
          required
        /></li>
        <li><label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          type='password'
          id='confirmPassword'
          ref={confirmPasswordRef}
          placeholder='Confirm new password'
          required
        /></li>
        <li><button type='submit'>Reset Password</button></li>
        </ul>
        </fieldset>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
