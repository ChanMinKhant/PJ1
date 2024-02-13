import React, { useRef, useState } from 'react';
import './File.css';
const FileCompo = (props) => {
  console.log(props);
  const textToCopyRef = useRef(null);
  const [filedata, Showfiledata] = useState(false);
  const handleFileData = () => {
    Showfiledata(!filedata);
  };

  const handleCopyClick = () => {
    const range = document.createRange();
    range.selectNode(textToCopyRef.current);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');

    // Deselect the text
    selection.removeAllRanges();
  };
  const handleFileDeleteClick = () => {
    const isConfirmed = window.confirm('Are you sure to delete?');

    // Check if user confirmed the deletion
    if (isConfirmed) {
      // Invoke the onDelete function passed from the parent (FileUploadPage)
      props.onFileDelete(props.shortId);
    }
  };

  return (
    <div>
      <ul className={`file-u ${filedata ? 'fileshow' : 'fileclose'}`}>
        <li className='fli'>
          <div className='nonda'>
            <div className='fileno'>{props.no}. </div>

            <div className='fileda'>{props.originalFilename}</div>
          </div>
          <div className='floatd'>
            <span onClick={handleFileDeleteClick} className='filedeletebtn '>
              Delete
            </span>
            <i
              className={`bi bi-caret-down-fill me-3 fs-3.5 ${
                filedata
                  ? 'bi bi-caret-up-fill me-3 fs-3.5'
                  : 'fbi bi-caret-down-fill me-3 fs-3.5'
              }`}
              onClick={handleFileData}
            ></i>
          </div>
        </li>
        <li className='fileli'>gkhjhk</li>
        <li className='fileli'>jkhkjh</li>
        <li className='fileli'>gkkhl</li>
        <li className='fileli'>gukhlih</li>
        <li className='fileli'>dytryt</li>
      </ul>
    </div>
  );
};

export default FileCompo;
