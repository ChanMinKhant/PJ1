import { useRef, useState } from 'react';
import { changePassword } from '../../services/authService';
import './css/changePW.css';

const ChangePassword = () => {
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentPassword = currentPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    try {
      setError(null);
      const response = await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      setSuccessMessage(response.message);
    } catch (error) {
      setSuccessMessage(null);
      setError(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <div className='c-pw-box'>
        
      <form onSubmit={handleSubmit} className='c-pw'>
      <fieldset><legend><h1>Change Password</h1></legend>
      <ul>
       <li> <label htmlFor='currentPassword'>Current Password</label>
        <input
          type='password'
          id='currentPassword'
          ref={currentPasswordRef}
          placeholder='Enter current password'
          required
        />
        </li>
        <li><label htmlFor='newPassword'>New Password</label>
        <input
          type='password'
          id='newPassword'
          ref={newPasswordRef}
          placeholder='Enter new password'
          required
        />
        </li>
        <li><label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          type='password'
          id='confirmPassword'
          ref={confirmPasswordRef}
          placeholder='Confirm new password'
          required
        />
        </li>
        <li><button type='submit'>Change Password</button></li>
        </ul>
        </fieldset>
      </form>
      </div>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};

export default ChangePassword;
