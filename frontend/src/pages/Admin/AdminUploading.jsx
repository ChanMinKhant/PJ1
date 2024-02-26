// import React, { useState } from 'react';
// import { AdminUpload } from '../../services/sendInfoService';
// import Nav from '../../components/Nav';
// import cloud from '../../../assets/cloud-computing.png';
// import SendExamResult from './SendExamResult';
// import './AdminUploading.css';
// import uploadcloud from '../../../assets/upload-file.png';
// import deleteone from '../../../assets/delete (1).png';
// const AdminUploading = () => {
//   const [uploadMessage, setUploadMessage] = useState('');
//   const [fileName, setFileName] = useState('');
//   const [error, setError] = useState('');
//   const [files, setFiles] = useState([]);

//   const handleFileChange = (event) => {
//     const selectedFiles = event.target.files;
//     setFiles([...files, ...selectedFiles]);
//     setFileName(selectedFiles[0]?.name || '');
//   };

//   const handleUploadSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     for (let i = 0; i < files.length; i++) {
//       formData.append('files', files[i]);
//     }
//     try {
//       const response = await AdminUpload(formData);
//       setUploadMessage('Files uploaded successfully.');
//       console.log(response);
//       setError('');
//     } catch (error) {
//       console.error('Error uploading files:', error);
//       setError(error?.response?.data?.message || 'Error uploading files.');
//       setUploadMessage('');
//     }
//   };
//   const handleUndoClick = () => {

//     setFiles(null);
//     setFileName(null);
//   };
//   return (
//     <div>
//       <Nav />
//       <div>
//         <form onSubmit={handleUploadSubmit}>
//           <label htmlFor='admin-upload' className='uploadonee'>
//             <input
//               type='file'
//               multiple
//               onChange={handleFileChange}
//               id='admin-upload'
//               className='custom-file-input'
//             />
//             <img src={cloud} alt='' className='cloudimg' />
//             <p>Browse file to upload</p>
//           </label>
//           <section className='uploaded-row'>
//             <button
//               type='submit'
//               className='border-0 bgg btn btn-primary d-md-block d-none'
//             >
//               Upload
//             </button>
//             <img
//               src={uploadcloud}
//               alt=''
//               width={20}
//               className='d-md-none d-flex'
//             />
//             <div>
//               <span>{fileName}</span>

//               <img
//                 src={deleteone}
//                 alt=''
//                 width={20}
//                 className='m-2'
//                 onClick={handleUndoClick}
//               />
//             </div>
//           </section>
//         </form>

//         {uploadMessage && <p>{uploadMessage}</p>}
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </div>
//       <SendExamResult />
//     </div>
//   );
// };

// export default AdminUploading;
import React, { useState, useEffect } from 'react';
import { AdminUpload } from '../../services/sendInfoService';
import Nav from '../../components/Nav';
import cloud from '../../../assets/cloud-computing.png';
import SendExamResult from './SendExamResult';
import './AdminUploading.css';
import uploadcloud from '../../../assets/upload-file.png';
import deleteone from '../../../assets/delete (1).png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminUploading = () => {
  const [uploadMessage, setUploadMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    setFiles([...files, ...selectedFiles]);

    if (selectedFiles.length === 1) {
      setFileName(selectedFiles[0]?.name || '');
    } else if (selectedFiles.length > 1) {
      setFileName(
        `${selectedFiles[0]?.name} and ${selectedFiles.length - 1} more files`,
      );
    } else {
      setFileName('');
    }
  };

  const handleUploadSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    try {
      const response = await AdminUpload(formData);
      toast.success('Files uploaded successfully', {
        position: 'bottom-center',
      });
      setUploadMessage('Files uploaded successfully.');
      console.log(response);
      setError('');
    } catch (error) {
      console.error('Error uploading files:', error.response.data);
      toast.error('Error uploading files', { position: 'bottom-center' });
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
      <ToastContainer className={'custom-toast'} />
      <div>
        <Nav />
        <div className='daddy'>
          <div className='formflexx'>
            <div>
              <form onSubmit={handleUploadSubmit} className='mmmd'>
                <label htmlFor='admin-upload' className='uploadonee'>
                  <input
                    type='file'
                    multiple
                    onChange={handleFileChange}
                    id='admin-upload'
                    className='custom-file-input'
                    hidden
                  />
                  <img src={cloud} alt='' className='cloudimgg' />
                  <p>Browse file to upload</p>
                </label>
                <section className='uploaded-roww'>
                  <button
                    type='submit'
                    className='border-0 bgg btn btn-primary p-2'
                  >
                    Upload
                  </button>
                  {/* <img
              src={uploadcloud}
              alt=''
              width={20}
              className='d-md-none d-flex'
            /> */}
                  <div>
                    <span>{fileName}</span>
                    {files.length > 0 && (
                      <img
                        src={deleteone}
                        alt=''
                        width={20}
                        className='m-2'
                        onClick={handleUndoClick}
                      />
                    )}
                  </div>
                </section>
              </form>

              {uploadMessage && <p>{uploadMessage}</p>}
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <div className='examresult'>
              <SendExamResult />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUploading;
