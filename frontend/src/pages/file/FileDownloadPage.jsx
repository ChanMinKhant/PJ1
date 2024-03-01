import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFile, getOriginalFilename } from '../../services/fileService';
import download from 'downloadjs';
import './FileDownloadPage.css'; // Import your external CSS file

const FileDownloadPage = () => {
  const { shortId } = useParams();
  const [filename, setFilename] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const originalFilename = await getOriginalFilename(shortId);
        setFilename(originalFilename.data);
      } catch (error) {
        setErrorMessage(error?.response?.data?.message);
        if (error?.response?.data?.message === 'Password required') {
          setIsPasswordRequired(true);
        }
      }
    };

    fetchData();
  }, [shortId]);

  const handleDownload = async () => {
    try {
      window.confirm('Are you sure you want to download this file?');
      const response = await getFile(shortId, password); // Pass password if required
      download(response, filename);
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
    }
  };

  return (
    <div className='file-download-container'>
      <h1>File Download Page</h1>
      <div className='file-name'>{filename}</div>
      {errorMessage && <div className='error-message'>{errorMessage}</div>}
      <button className='download-button' onClick={handleDownload}>
        Download
      </button>
      {isPasswordRequired && (
        <input
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='password-input'
        />
      )}
    </div>
  );
};

export default FileDownloadPage;
