import { useEffect, useState } from 'react';
import { createHost, getHosts, suspendHost } from '../../services/hostService';
import './host.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Host from '../../components/Host';
import cloud from '../../../assets/cloud-computing.png';
import uploadcloud from '../../../assets/upload-file.png';
import deleteone from '../../../assets/delete (1).png';

const FileUploadPage = () => {
  const [formData, setFormData] = useState({
    customDomain: '',
    password: '',
    description: '',
    comment: '',
    files: [],
  });
  const [hosts, setHosts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const [password, setPassword] = useState('');

  console.log(hosts);
  useEffect(() => {
    const tempfunc = async () => {
      try {
        const res = await getHosts();
        setHosts(res.data);
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    };
    tempfunc();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormData({ ...formData, files });
    setFileName(files.name);
  };
  const handleUndoClick = () => {
    // Clear the selected file
    setFormData(null);
    setFileName(null);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { customDomain, password, description, comment, files } = formData;
      console.log(customDomain);
      const formDataApi = new FormData();
      formDataApi.append('customDomain', customDomain);
      formDataApi.append('password', password);
      formDataApi.append('description', description);
      formDataApi.append('comment', comment);
      for (let i = 0; i < files.length; i++) {
        formDataApi.append('files', files[i]);
      }

      const response = await createHost(formDataApi);
toast.success('File(s) uploaded successfully!')
      setSuccessMessage('File(s) uploaded successfully!');
      setErrorMessage('');
      setHosts([...hosts, response.data]);
      console.log('File uploaded successfully:', response.data);
      // Additional actions after successful upload
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message ||
          'Error uploading file(s). Please try again.',
      );
      setSuccessMessage('');
      console.error('Error uploading file:', error);
      // Handle error, e.g., show an error message to the user
    }
  };
  return (
    <div className='host-box'>
       
      <div>
      <ToastContainer/>
        <form onSubmit={handleSubmit} className='host'>
         
            {/* <ul>
              

              <li>
                <label>
                  Choose File(s):
                  <input type='file' multiple onChange={handleFileChange} />
                </label>
              </li>
              <li>
                <label className='dhostCustom'>
                  Custom Link:
                  <input
                    className='CustomInput'
                    
                    type='text'
                    onChange={(e) =>
                      setFormData({ ...formData, customDomain: e.target.value })
                    }
                  />
                </label>
              </li>
              <li>
                <button type='submit'>Upload File(s)</button>
              </li>

              <li>
                {successMessage && (
                  <div style={{ color: 'green' }}>{successMessage}</div>
                )}
                {errorMessage && (
                  <div style={{ color: 'red' }}>{errorMessage}</div>
                )}
              </li>
            </ul> */}
<div className='Dhost-coloum'>
<div className='Dhost-coloum-left'>
              <label htmlFor='fileInput' className='uploadone'>
                {/* Choose a file */}
                <input
                  type='file'
                  onChange={handleFileChange}
                  className='custom-file-input'
                  id='fileInput'
                  hidden
                />
                <img src={cloud} alt='' className='cloudimg' />
                <p>Browse file to upload</p>
              </label>
              <section className='uploaded-row'>
                <button
                  type='submit'
                  className='border-0 bgg btn btn-primary d-md-block d-none pt-0'
                >
                  {/* <img src={uploadcloud} alt='' width={20} /> */}
                  Upload
                </button>
                <img
                  src={uploadcloud}
                  alt=''
                  width={20}
                  className='d-md-none d-flex'
                />
                <div>
                  <span>{fileName}</span>

                  <img
                    src={deleteone}
                    alt=''
                    width={20}
                    className='m-2'
                    onClick={handleUndoClick}
                  />
                </div>
              </section>
            </div>

            <div className='Dhost-coloum-right'>

            <label className='dhostCustom'>
                  Custom Link:
                  <input
                    className='CustomInput'
                    type='text'
                    placeholder='Custom Link'
                    onChange={(e) =>
                      setFormData({ ...formData, customDomain: e.target.value })
                    }
                  />
                </label>
                
                <label className='dhostCustom'>
                  Password
                
                <input
                  type='text'
                  placeholder='Password'
                  value={password}
                  onChange={handlePasswordChange}
                  className='CustomInput'
                  id='password'
                />
              </label>
              
            </div>
            </div>
        </form>
        {successMessage && (
                  <div style={{ color: 'green' }}>{successMessage}</div>
                )}
                {errorMessage && (
                  <div style={{ color: 'red' }}>{errorMessage}</div>
                )}
      </div>
      <div className='tableHost'>
        <table className='hostTable'>
          <thead>
            <tr>
              <th>Filename</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {hosts?.map((host) => {
              return <Host {...host} key={host.id} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileUploadPage;
