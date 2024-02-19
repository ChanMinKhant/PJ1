import React, { useState } from 'react';
import { AdminUpload } from '../../services/sendInfoService';

const AdminUploading = () => {
  const [uploadMessage, setUploadMessage] = useState('');
  const [error, setError] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    setFiles([...files, ...selectedFiles]);
  };

  const handleUploadSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    try {
      const response = await AdminUpload(formData);
      setUploadMessage('Files uploaded successfully.');
      console.log(response);
      setError('');
    } catch (error) {
      console.error('Error uploading files:', error);
      setError(error?.response?.data?.message || 'Error uploading files.');
      setUploadMessage('');
    }
  };

  return (
    <div>
      <form onSubmit={handleUploadSubmit}>
        <input type='file' multiple onChange={handleFileChange} />
        <button
          type='submit'
          className='border-0 bgg btn btn-primary d-md-block d-none'
        >
          Upload
        </button>
      </form>

      {uploadMessage && <p>{uploadMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AdminUploading;
