import apiService from './apiService';

const fileBaseUrl = '/file';

const uploadFile = async (formData) => {
  try {
    const response = await apiService.post(`${fileBaseUrl}/upload`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getFile = async (shortId) => {
  try {
    const response = await apiService.get(`${fileBaseUrl}/${shortId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

const getOriginalFilename = async (shortId) => {
  try {
    const response = await apiService.get(
      `${fileBaseUrl}/orignalName/${shortId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllFiles = async () => {
  try {
    const response = await apiService.get(`${fileBaseUrl}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateFile = async (shortId, data) => {
  try {
    const response = await apiService.patch(`${fileBaseUrl}/${shortId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteFile = async (shortId) => {
  try {
    const response = await apiService.delete(`${fileBaseUrl}/${shortId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const sendDownloadFile = async (shortId) => {
  try {
    const response = await apiService.delete(
      `${fileBaseUrl}/sendDownloadFile/${shortId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  uploadFile,
  getFile,
  getOriginalFilename,
  getAllFiles,
  updateFile,
  deleteFile,
};
