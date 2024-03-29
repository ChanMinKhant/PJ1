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

const getHosts = async () => {
  try {
    const response = await apiService.get(`${hostBaseUrl}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const isValidHost = async (subdomain, password) => {
  try {
    const response = await apiService.get(`${hostBaseUrl}/${subdomain}`, {
      data: { password },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const suspendHost = async (domain) => {
  try {
    const response = await apiService.delete(`${hostBaseUrl}/${domain}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { createHost, getHosts, suspendHost, isValidHost };
