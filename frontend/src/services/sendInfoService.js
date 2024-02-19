import apiService from './apiService';

const authBaseUrl = '/sharing';

const AdminUpload = async (userData) => {
  try {
    const response = await apiService.post(`${authBaseUrl}/upload`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export { AdminUpload };
