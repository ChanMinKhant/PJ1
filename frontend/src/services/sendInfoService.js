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

const sendEmail = async (data) => {
  try {
    const response = await apiService.post(`${authBaseUrl}/send`, {
      year: 'First',
      semester: 'First',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getStudents = async (year, semester, major, section) => {
  //getStudents('First', 'First', 'Computer Science', 'A')
  try {
    const response = await apiService.post(`${authBaseUrl}/students`, {
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

const deleteStudent = async (id) => {
  try {
    const response = await apiService.delete(`${authBaseUrl}/students/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateStudent = async (id, data) => {
  try {
    const response = await apiService.put(
      `${authBaseUrl}/students/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { AdminUpload, sendEmail };
