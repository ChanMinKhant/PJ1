import { useEffect, useState } from 'react';
import { logout } from '../../services/authService';
import './css/logout.css';

const Logout = () => {
  const [message, setMessage] = useState(null);

  const handleLogout = async () => {
    try {
      await logout();
      setMessage('Logout successful');
    } catch (error) {
      setMessage('Logout unsuccessful');
      console.error('Logout error:', error);
    }
  };
  useEffect(() => {
    // Call the logout function when the component mounts
    handleLogout();
  }, [history]);

  return (
    <div className='l-out'>
      <div className='l-out-box'>
      <h1>Logging out...</h1>
      <h2>{message}</h2>
      </div>
    </div>
  );
};

export default Logout;
