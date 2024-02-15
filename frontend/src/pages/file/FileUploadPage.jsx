import React, { useState, useEffect } from 'react';
import {
  uploadFile,
  getAllFiles,
  deleteFile,
} from '../../services/fileService';
import FileCompo from '../../components/File';
import './FileUpload.css';
const FileUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [customLink, setCustomLink] = useState('');
  const [password, setPassword] = useState('');
  const [limit, setLimit] = useState('');
  const [customFileName, setCustomFileName] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleCustomLinkChange = (event) => {
    setCustomLink(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handleCustomFileNameChange = (event) => {
    setCustomFileName(event.target.value);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setUploadMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('customLink', customLink);
    formData.append('password', password);
    formData.append('limit', limit);
    formData.append('customFileName', customFileName);

    try {
      // console.log('here1');
      const response = await uploadFile(formData);
      console.log('response.data');
      setUploadMessage('File uploaded successfully.');
      setFiles([...files, response?.data]);
      // console.log(files);
      // console.log('first');
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(error?.response?.data?.message || 'Error uploading file.');
    }
  };
  // from
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await getAllFiles();
        setFiles(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching files:', error?.response?.data?.message);
        setError(error?.response?.data?.message || 'Error fetching files.');
      }
    };

    fetchFiles();
  }, []);
  const handleDeleteFile = async (shortId) => {
    try {
      const res = await deleteFile(shortId);
      const updatedFiles = files.filter((file) => file.shortId !== shortId);
      setFiles(updatedFiles);
      console.log(res);
      // console.log(updatedFiles);
    } catch (error) {
      console.error('Error deleting File:', error);
    }
  };
  // to
  return (
    <div className='fileparent'>
      {/* <h1>File Upload</h1> */}
      <div className='container'>
        <div className='form-container'>
          {/* <h2 class='text-center mb-4'>Simple Form</h2> */}

          <form onSubmit={handleUpload} encType='multipart/form-data'>
            <div className='custom-file mb-3'>
              <label htmlFor='fileInput' className='form-label'>
                Choose a file
              </label>
              <input
                type='file'
                onChange={handleFileChange}
                className='custom-file-input'
                id='fileInput'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='customlink' className='form-label'>
                Custom Link
              </label>
              <input
                type='text'
                placeholder='Custom Link'
                value={customLink}
                onChange={handleCustomLinkChange}
                className='form-control'
                id='customlink'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                type='text'
                placeholder='Password'
                value={password}
                onChange={handlePasswordChange}
                className='form-control'
                id='password'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='limit' className='form-label'>
                Limit
              </label>
              <input
                type='text'
                placeholder='Limit'
                value={limit}
                onChange={handleLimitChange}
                className='form-control'
                id='limit'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='customfilename' className='form-label'>
                Name
              </label>
              <input
                type='text'
                placeholder='Custom File Name'
                value={customFileName}
                onChange={handleCustomFileNameChange}
                className='form-control'
                id='customfilename'
              />
            </div>

            <button type='submit' className='btn btn-primary'>
              Upload File
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {uploadMessage && <p style={{ color: 'green' }}>{uploadMessage}</p>}
          </form>
        </div>
      </div>
      <div className='filediv'>
        <h1>My Files</h1>
        {files.map((file, index) => (
          <FileCompo
            key={file._id}
            {...file}
            no={index + 1}
            onFileDelete={handleDeleteFile}
          />
        ))}
      </div>
    </div>
  );
};

export default FileUploadPage;
