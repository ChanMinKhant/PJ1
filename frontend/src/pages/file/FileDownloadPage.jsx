import React from 'react';
import { useParams } from 'react-router-dom';
import { getFile, getOriginalFilename } from '../../services/fileService'; // Import your apiService function
import { useState, useEffect } from 'react';
import download from 'downloadjs';

const FileDownloadPage = () => {
  const { shortId } = useParams();
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFile(shortId);
        const originalFilename = await getOriginalFilename(shortId);
        console.log(originalFilename);
        download(response.data, originalFilename.data);
      } catch (error) {
        setErrorMessage(error?.response?.data?.message);
        console.log(error?.response);
        if (error?.response?.data?.message === 'Password required') {
          setIsPasswordRequired(true);
        }
      }
    };
    fetchData();
    // if (file) window.location.href = file;
  });
  return <div>FileDownloadPage</div>;
};

export default FileDownloadPage;
