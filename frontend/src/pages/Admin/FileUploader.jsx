import React from 'react';
import cloud from '../../../assets/cloud-computing.png';
import uploadcloud from '../../../assets/upload-file.png';
import deleteone from '../../../assets/delete (1).png';

const FileUploader = ({
  handleFileChange,
  handleUploadSubmit,
  fileName,
  files,
  handleUndoClick,
}) => {
  return (
    <div className='formx'>
      <form onSubmit={handleUploadSubmit} className='mmmd'>
        <label htmlFor='admin-upload' className='uploadonee'>
          <input
            type='file'
            multiple
            onChange={(e) => handleFileChange(e.target.files)}
            id='admin-upload'
            className='custom-file-input'
            hidden
          />
          <img src={cloud} alt='' className='cloudimgg' />
          <p>Browse file to upload</p>
        </label>
        <section className='uploaded-roww'>
          <button type='submit' className='border-0 bgg btn btn-primary p-2'>
            Upload
          </button>
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
    </div>
  );
};

export default FileUploader;
