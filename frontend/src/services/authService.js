import apiService from './apiService';

const authBaseUrl = '/auth';

const register = async (userData) => {
  try {
    const response = await apiService.post(`${authBaseUrl}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const verifyEmail = async (token) => {
  try {
    const response = await apiService.get(
      `${authBaseUrl}/verifyemail/${token}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const login = async (userData) => {
  try {
    const response = await apiService.post(`${authBaseUrl}/login`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const logout = async () => {
  try {
    const response = await apiService.get(`${authBaseUrl}/logout`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const forgotPassword = async (email) => {
  try {
    const response = await apiService.post(`${authBaseUrl}/forgotpassword`, {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (resetToken, password, confirmPassword) => {
  try {
    const response = await apiService.patch(
      `${authBaseUrl}/resetpassword/${resetToken}`,
      { password, confirmPassword }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const changePassword = async (passwordData) => {
  try {
    const response = await apiService.patch(
      `${authBaseUrl}/changepassword`,
      passwordData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const logoutAllDevices = async () => {
  try {
    const response = await apiService.get(`${authBaseUrl}/logoutalldevices`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  register,
  verifyEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  logoutAllDevices,
};
