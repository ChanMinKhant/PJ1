import React, { useRef, useState } from 'react';
import MyModal from '../dashboard/modal';
import './File.css';
import htmlIcon from '../../assets/html-5.png';
import cssIcon from '../../assets/css-3.png';
import jsIcon from '../../assets/js-file.png';
import javaIcon from '../../assets/java (1).png';
import wordIcon from '../../assets/word (1).png';
import pngIcon from '../../assets/png.png';
import excelIcon from '../../assets/excel.png';
import powerpointIcon from '../../assets/powerpoint.png';
import pdfIcon from '../../assets/pdf.png';
import jpgIcon from '../../assets/jpg.png';
import phpIcon from '../../assets/php.png';
import txtIcon from '../../assets/txt-file.png';
import defaultIcon from '../../assets/word.png';
import downloadcountIcon from '../../assets/download.png';
const FileCompo = (props) => {
  console.log(props)
  const textToCopyRef = useRef(null);
  const [filedata, Showfiledata] = useState(false);
  const handleFileData = () => {
    Showfiledata(!filedata);
  };
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const handleCopyClick = () => {
    const range = document.createRange();
    range.selectNode(textToCopyRef.current);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');

    // Deselect the text
    selection.removeAllRanges();
    // Show "Copied!" message for 2 seconds
    setShowCopiedMessage(true);
    setTimeout(() => {
      setShowCopiedMessage(false);
    }, 2000);

    // Hide the "Copied!" message and show the clip icon again after 4 seconds
    setTimeout(() => {
      setShowCopiedMessage(false);
    }, 4000);
  };
  const handleFileDeleteClick = () => {
    const isConfirmed = window.confirm('Are you sure to delete?');

    // Check if user confirmed the deletion
    if (isConfirmed) {
      // Invoke the onDelete function passed from the parent (FileUploadPage)
      props.onFileDelete(props.shortId);
    }
  };
  const getFileIcon = (extension) => {
    switch (extension.toLowerCase()) {
      case 'html':
        return <img src={htmlIcon} alt='HTML' className='filePngs' />;
      case 'css':
        return <img src={cssIcon} alt='CSS' className='filePngs' />;
      case 'js':
        return <img src={jsIcon} alt='JavaScript' className='filePngs' />;
      case 'java':
        return <img src={javaIcon} alt='Java' className='filePngs' />;
      case 'docx':
        return <img src={wordIcon} alt='HTML' className='filePngs' />;
      case 'xlsx':
        return <img src={excelIcon} alt='Excel' className='filePngs' />;
      case 'pptx':
        return (
          <img src={powerpointIcon} alt='Powerpoint' className='filePngs' />
        );
      case 'pdf':
        return <img src={pdfIcon} alt='Pdf' className='filePngs' />;
      case 'jpg':
        return <img src={jpgIcon} alt='Jpg' className='filePngs' />;
      case 'png':
        return <img src={pngIcon} alt='Png' className='filePngs' />;
      case 'php':
        return <img src={phpIcon} alt='PHP' className='filePngs' />;
      case 'txt':
        return <img src={txtIcon} alt='Text' className='filePngs' />;
      default:
        return <img src={defaultIcon} alt='File' className='filePngs' />;
    }
  };
  const checkFileSize = (fileSize) => {
    if (fileSize > 1000000) {
      return `${(fileSize / 1000000).toFixed(2)} MB`;
    } else if (fileSize > 1000) {
      return `${(fileSize / 1000).toFixed(2)} KB`;
    } else {
      return `${fileSize} B`;
    }
  };
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const dateObject = new Date(props.createdAt);

  // Format the date using toLocaleString()
  const formattedDate = dateObject.toLocaleString();

  const fileExtension = props.originalFilename.split('.').pop();
  return (
    <div>
      <div className='fli'>
        <div className='nonda'>
          <div className='fileno'>{props.no}. </div>

          <div className='fileda'>
            {getFileIcon(fileExtension)}
            <div>
              {props.originalFilename}
              <br />
              <div className='someimportant'>
                {checkFileSize(props.fileSize)}
              </div>
            </div>
          </div>
          <p
            // className='surl'
            // href={props.shortId}
            target='_blank'
            rel='noopener noreferrer'
            ref={textToCopyRef}
            style={{ marginRight: '10px', cursor: 'pointer' }}
            // onClick={handleNavagate}
          >
            {props.shortId}
          </p>
        </div>
        <div className='floatd'>
          <div className='downloadcountspan'>
            <img
              src={downloadcountIcon}
              alt='downloadcount'
              className='downloadcount'
            />
            <br />
            <b>{props.downloadCount}</b>
            <i className='ii'>download</i>
          </div>
          {/* <div className='clipdiv'>
            {showCopiedMessage ? (
              <span className='copied-message'>Copied!</span>
            ) : (
              <i className='bi bi-clipboard clip' onClick={handleCopyClick}></i>
            )}
          </div> */}
          <span onClick={handleFileDeleteClick} className='filedeletebtn '>
            Delete
          </span>
          {/* <i
            className={`bi bi-caret-down-fill me-3 fs-3.5 ${
              filedata
                ? 'bi bi-caret-up-fill me-3 fs-3.5'
                : 'fbi bi-caret-down-fill me-3 fs-3.5'
            }`}
            onClick={handleFileData}
          ></i> */}
          <div>
            <i
              className='bi bi-three-dots me-3 fs-3.5'
              onClick={handleShowModal}
            ></i>
            {/* <span>&#8226;&#8226;&#8226;</span> */}
            <div className='modalposition'>
              <MyModal
                show={showModal}
                handleClose={handleCloseModal}
                showCopiedMessage={showCopiedMessage}
                handleCopyClick={handleCopyClick}
                shortId={props.shortId}
                name={props.originalFilename}
                downloadCount={props.downloadCount}
                date={formattedDate}
                fileSize={checkFileSize(props.fileSize)}
                onFileDelete={props.onFileDelete}
                limit={props.limit}
                isactive={props.isActive}
              />
            </div>
          </div>
        </div>
      </div>
      <ul className={`file-u ${filedata ? 'fileshow' : 'fileclose'}`}>
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
