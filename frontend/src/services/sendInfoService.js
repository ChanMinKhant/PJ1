import apiService from './apiService';

const sharingBaseUrl = '/sharing';

export const AdminUpload = async (userData) => {
  try {
    const response = await apiService.post(
      `${sharingBaseUrl}/upload`,
      userData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendEmail = async (data) => {
  try {
    const response = await apiService.post(`${sharingBaseUrl}/send`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendInfo = async (data) => {
  try {
    const response = await apiService.post(`${sharingBaseUrl}/sendInfo`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStudents = async (year, semester, major, section) => {
  //getStudents('First', 'First', 'Computer Science', 'A')
  try {
    const response = await apiService.post(`${sharingBaseUrl}/students`, {
      year,
      semester,
      major,
      section,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteStudent = async (id) => {
  // const deleteStudent = async (id) => {
  try {
    const response = await apiService.delete(
      `${sharingBaseUrl}/students/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
  // };
};

export const updateStudent = async (id, data) => {
  try {
    const response = await apiService.put(
      `${sharingBaseUrl}/students/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
