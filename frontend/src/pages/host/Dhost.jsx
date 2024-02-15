import { useEffect, useState } from 'react';
import { createHost, getHosts,suspendHost } from '../../services/hostService';
import './host.css';
import Host from '../../components/Host'
const FileUploadPage = () => {
  const [formData, setFormData] = useState({
    customDomain: '',
    password: '',
    description: '',
    comment: '',
    files: [],
  });
  const [hosts, setHosts]= useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(()=>{
    const tempfunc= async ()=>{
     try {
      const res = await getHosts();
      setHosts(res.data)
     } catch (error) {
      console.log(error.response?.data?.message);
     }
    }
    tempfunc()
  },[])
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormData({ ...formData, files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { customDomain, password, description, comment, files } = formData;

      const formDataApi = new FormData();
      formDataApi.append('customDomain', customDomain);
      formDataApi.append('password', password);
      formDataApi.append('description', description);
      formDataApi.append('comment', comment);

      for (let i = 0; i < files.length; i++) {
        formDataApi.append('files', files[i]);
      }

      const response = await createHost(formDataApi);

      setSuccessMessage('File(s) uploaded successfully!');
      setErrorMessage('');
      setHosts([...hosts,response.data]);
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
  // Delet Host
  // const handleDeleteHost = async (domain) => {
  //   try {
  //     await deleteHost(domain);
  //     const updatedHosts = hosts.filter((host) => host.domain !== domain);
  //     setUrls(updatedHosts);
  //   } catch (error) {
  //     console.error('Error deleting URL:', error.message);
  //   }
  // };
  // const linktohost=`http://${host.domain}.${window.location.host}`;
  return (
<div>
<div className='host-box'>
      
      <form onSubmit={handleSubmit} className='host'>
        <fieldset>
          <legend>
            <h1>File Upload Page</h1>
          </legend>
          <ul>
            {/* ... (previous form inputs) ... */}

            <li>
              <label>
                Choose File(s):
                <input type='file' multiple onChange={handleFileChange} />
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
          </ul>
        </fieldset>
      </form>
      
    </div>
   
    {
      hosts?.map((host) => {
        return (
          <div key={host.id} className='hostUpload'>
            <Host {...host}/>
          </div>
        )
      })
    }
    
    
    
    
</div>
);

};

export default FileUploadPage;
