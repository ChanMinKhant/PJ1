import apiService from './apiService';

const hostBaseUrl = '/host';

const createHost = async (formData) => {
  try {
    const response = await apiService.post(`${hostBaseUrl}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { createHost };
