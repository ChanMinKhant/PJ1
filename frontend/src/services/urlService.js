import apiService from './apiService';
const urlBaseUrl = '/url';

const createShortenUrl = async (data) => {
  try {
    const response = await apiService.post(`${urlBaseUrl}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllUrls = async () => {
  try {
    const response = await apiService.get(`${urlBaseUrl}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUrl = async (shortUrl, password) => {
  try {
    const response = await apiService.post(`${urlBaseUrl}/${shortUrl}`, {
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteUrl = async (shortUrl) => {
  try {
    const response = await apiService.delete(`${urlBaseUrl}/${shortUrl}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateUrl = async (shortUrl, data) => {
  try {
    const response = await apiService.patch(`${urlBaseUrl}/${shortUrl}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { createShortenUrl, getAllUrls, getUrl, deleteUrl, updateUrl };
