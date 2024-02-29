import React, { useState, useEffect } from 'react';
import { AdminUpload, sendEmail } from '../../services/sendInfoService';
import SendExamResult from './SendExamResult';
import FileUploader from './FileUploader';
import EmailSender from './EmailSender';
import './AdminUploading.css';

const AdminUploading = () => {
  const [sendOptions, setSendOptions] = useState({
    year: '',
    semester: '',
    major: '',
    section: '',
  });
  const [uploadMessage, setUploadMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSendOptions((prevSendOptions) => ({
      ...prevSendOptions,
      [name]: value,
    }));
  };

  const handleFileChange = (selectedFiles) => {
    setFiles([...files, ...selectedFiles]);

    if (selectedFiles.length === 1) {
      setFileName(selectedFiles[0]?.name || '');
    } else if (selectedFiles.length > 1) {
      setFileName(
        `${selectedFiles[0]?.name} and ${selectedFiles.length - 1} more files`
      );
    } else {
      setFileName('');
    }
  };

  const handleSendEmail = async () => {
    console.log(sendOptions);
    try {
      const res = await sendEmail(sendOptions);
      console.log(res);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  const handleUploadSubmit = async () => {
    console.log(files);
    if (files.length === 0) {
      setError('Please select at least one file for upload.');
      setUploadMessage('');
      return; // Stop further execution
    }
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
      console.error('Error uploading files:', error.response);
      setError(error?.response?.data?.message || 'Error uploading files.');
      setUploadMessage('');
    }
  };

  const handleUndoClick = () => {
    // Clear the selected files and reset the fileName
    setFiles([]);
    setFileName('');
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Check if there are no selected files before clearing messages
      if (files.length === 0) {
        setError('');
        setUploadMessage('');
      }
    }, 1000);

    return () => clearTimeout(timeoutId); // Clear the timeout on component unmount
  }, [error, uploadMessage, files]);

  return (
    <div>
      <div className='daddy'>
        <div className='formflexx'>
          <FileUploader
            handleFileChange={handleFileChange}
            handleUploadSubmit={handleUploadSubmit}
            fileName={fileName}
            files={files}
            handleUndoClick={handleUndoClick}
          />
          <EmailSender
            sendOptions={sendOptions}
            handleChange={handleChange}
            handleSendEmail={handleSendEmail}
          />
        </div>
      </div>
      <SendExamResult />
    </div>
  );
};

export default AdminUploading;
