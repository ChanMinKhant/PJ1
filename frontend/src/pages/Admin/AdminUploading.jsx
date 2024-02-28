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
// import Nav from '../../components/Nav';
import cloud from '../../../assets/cloud-computing.png';
import SendExamResult from './SendExamResult';
import './AdminUploading.css';
import uploadcloud from '../../../assets/upload-file.png';
import deleteone from '../../../assets/delete (1).png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminUploading = () => {
  const [formData, setFormData] = useState({
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('first');
      const res = await sendEmail(formData);
      console.log(res);
    } catch (error) {
      console.log(error.response);
    }
    // Now you can send formData to your backend API
    // sendDataToBackend(formData);
  };
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
        {/* <Nav /> */}
        <div className='daddy'>
          <div className='formflexx'>
            <div className='formx'>
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
              <form className='mt-3 p-2'>
                <div className='tooo'>
                  <h4 className='mb-0 text-start sto'>Send to:</h4>
                  <label className='col-form-label cco'>
                    <select
                      name='year'
                      className='sss form-select'
                      value={formData.year}
                      onChange={handleChange}
                    >
                      <option value=''>Select Year</option>
                      <option value='First'>First</option>
                      <option value='Second'>Second</option>
                      <option value='Third'>Third</option>
                      <option value='Fourth'>Fourth</option>
                      <option value='Fifth'>Fifth</option>
                    </select>
                  </label>

                  <label className='col-form-label cco'>
                    <select
                      className='sss form-select'
                      name='semester'
                      value={formData.semester}
                      onChange={handleChange}
                    >
                      <option value=''>Select Semester</option>
                      <option value='First'>First</option>
                      <option value='Second'>Second</option>
                    </select>
                  </label>

                  <label className='col-form-label cco'>
                    <select
                      name='major'
                      className='sss form-select'
                      value={formData.major}
                      onChange={handleChange}
                      aria-label='Default select example'
                    >
                      <option value=''>Select Major</option>
                      <option value='CS'>CS</option>
                      <option value='CT'>CT</option>
                      <option value='CST'>CST</option>
                    </select>
                  </label>
                  <label className='col-form-label cco'>
                    <select
                      className='sss form-select'
                      name='section'
                      value={formData.section}
                      onChange={handleChange}
                    >
                      <option value=''>Select Section</option>
                      <option value='A'>A</option>
                      <option value='B'>B</option>
                    </select>
                  </label>
                  <button
                    onClick={handleSubmit}
                    className='btn btn-secondary btn-lg btn-block'
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <SendExamResult />
      </div>
    </div>
  );
};

export default AdminUploading;
