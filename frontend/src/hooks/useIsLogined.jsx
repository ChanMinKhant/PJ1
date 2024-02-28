import { useState, useEffect } from 'react';
import { isLogined } from './../services/authService';

const useIsLogined = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await isLogined();
        setIsLogin(res.isLogined);
        setIsAdmin(res.isAdmin);
      } catch (error) {
        // Handle any errors that occur during the authentication check
        console.error('Error checking login status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  return { isLogined: isLogin, loading, isAdmin };
};
export default useIsLogined;
