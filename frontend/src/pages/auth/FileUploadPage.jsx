import { useEffect, useState } from 'react';
import axios from 'axios';

function FileUploadPage() {
  const [file, setFile] = useState(null);

  let div = <div>hello</div>;

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append('file', file);
    axios.post('', formData);
  };

  return (
    <div>
      <h1>Upload a File</h1>
      <input type='file' onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload!</button>
    </div>
  );
}

export default FileUploadPage;
