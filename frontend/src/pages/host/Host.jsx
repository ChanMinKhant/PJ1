import { useState } from 'react';
import { createHost } from '../../services/hostService';
import './host.css';
import Nav from '../../components/Nav';

const FileUploadPage = () => {
  const [formData, setFormData] = useState({
    customDomain: '',
    password: '',
    description: '',
    comment: '',
    files: [],
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      <Nav />
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
  );
};

export default FileUploadPage;
