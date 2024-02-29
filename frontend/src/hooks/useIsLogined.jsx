import { useState, useEffect } from 'react';
import { isLogined } from './../services/authService';

const useIsLogined = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await isLogined();
        setIsLogin(res.isLogined);
        setIsAdmin(res.isAdmin);
        setIsPremium(res.isPremium);
      } catch (error) {
        // Handle any errors that occur during the authentication check
        console.error('Error checking login status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  return { isLogined: isLogin, loading, isAdmin, isPremium };
};
export default useIsLogined;
