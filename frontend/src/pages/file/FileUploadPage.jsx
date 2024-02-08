import React, { useState, useEffect } from 'react';
import {
  uploadFile,
  getAllFiles,
  deleteFile,
} from '../../services/fileService';
import FileCompo from '../../components/File';

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
    // from
    // useEffect(() => {
    //   const fetchFiles = async () => {
    //     try {
    //       const response = await getAllFiles();
    //       console.log(response.data);
    //       setFiles(response.data);
    //       // setIsPremium(response.isPremium);
    //       console.log(response);
    //     } catch (error) {
    //       console.error('Error fetching shortened URLs:', error.message);
    //       setErrorMessage('Failed to fetch shortened URLs. Please try again.');
    //     }
    //   };
    //   fetchUrls();
    // }, []);
    // to
    try {
      console.log('here1');
      const response = await uploadFile(formData);
      console.log('response.data');
      setUploadMessage('File uploaded successfully.');
      // setFiles([...files, response?.data]);
      // console.log(files);
      console.log('first');
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
  // to
  return (
    <div>
      <h1>File Upload</h1>
      <div className='container'>
        <div className='form-container'>
          {/* <h2 class='text-center mb-4'>Simple Form</h2> */}

          <form onSubmit={handleUpload} encType='multipart/form-data'>
            <div className='custom-file mb-3'>
              <label for='fileInput' className='form-label'>
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
              <label for='customlink' className='form-label'>
                Name
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
              <label for='password' className='form-label'>
                Name
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
              <label for='limit' className='form-label'>
                Name
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
              <label for='customfilename' className='form-label'>
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
            {/* from */}
            {/* <div class='container'>
          <div class='form-container'>
            <h2 class='text-center mb-4'>Simple Form</h2>

            <form>
              <div class='mb-3'>
                <label for='name' class='form-label'>
                  Name
                </label>
                <input
                  type='text'
                  class='form-control'
                  id='name'
                  placeholder='Your Name'
                  required
                />
              </div>

              <div class='mb-3'>
                <label for='email' class='form-label'>
                  Email address
                </label>
                <input
                  type='email'
                  class='form-control'
                  id='email'
                  placeholder='Your Email'
                  required
                />
              </div>

              <div class='mb-3'>
                <label for='password' class='form-label'>
                  Password
                </label>
                <input
                  type='password'
                  class='form-control'
                  id='password'
                  placeholder='Your Password'
                  required
                />
              </div>

              <div class='mb-3'>
                <label for='confirmPassword' class='form-label'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  class='form-control'
                  id='confirmPassword'
                  placeholder='Confirm Password'
                  required
                />
              </div>

              <button type='submit' class='btn btn-primary'>
                Submit
              </button>
            </form>
          </div>
        </div> */}
            {/* to */}
            <button type='submit' className='btn btn-primary'>
              Upload File
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {uploadMessage && <p style={{ color: 'green' }}>{uploadMessage}</p>}
          </form>
        </div>
      </div>
      {/* <div className='filediv'>
        {files.map((file) => (
          <FileCompo
            // className={`${isPremium ? 'donotshow' : 'show'}`}
            key={file._id}
            {...file}
            // onDelete={handleDeleteUrl}
          />
        ))}
      </div> */}
      <h2>Uploaded Files</h2>

      {files?.map((file) => (
        <ul key={file._id}>
          <li key={file._id}>{file.originalFilename}</li>
          <li>{file.shortId}</li>
        </ul>
      ))}
    </div>
  );
};

export default FileUploadPage;
