import { useState, useEffect } from 'react';
import { isLogined } from './../services/authService';

const useIsLogined = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await isLogined();
        console.log(res);
        setIsLogin(res.isLogined);
      } catch (error) {
        // Handle any errors that occur during the authentication check
        console.error('Error checking login status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  return { isLogined: isLogin, loading };
};
export default useIsLogined;
