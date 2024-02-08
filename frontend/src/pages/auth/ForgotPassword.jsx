import { useRef, useState } from 'react';
import { forgotPassword } from '../../services/authService';
import './css/forgetPW.css';

const ForgotPassword = () => {
  const emailRef = useRef();
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;

    try {
      // Assuming forgotPassword returns a success message on successful initiation
      const response = await forgotPassword(email);
      setError(null);
      setSuccessMessage(response.message);
      console.log(response);
    } catch (error) {
      setSuccessMessage(null);
      setError(
        error.response?.data?.message ||
          'An error occurred. Please check your email and try again.'
      );
    }
  };

  return (
    <>
      <div className='f-pw-box'>
      <form onSubmit={handleSubmit} className='f-pw'>
        <fieldset><legend><h1>Forgot Password</h1></legend>
        <ul>
       <li><label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          ref={emailRef}
          placeholder='Enter your email'
          required
        /> </li>
        <li><button type='submit'>Submit</button></li>
        </ul>
        </fieldset>
      </form>
      </div>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};

export default ForgotPassword;
