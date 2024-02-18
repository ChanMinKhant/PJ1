// MyModal.js
import React, { useRef, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import './modal.css';
const MyModal = ({
  show,
  handleClose,
  shortId,
  downloadCount,
  showCopiedMessage,
  handleCopyClick,
  name,
  date,
  fileSize,
  refe,
  onFileDelete,
}) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [show, handleClose]);

  return (
    <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
      <div ref={modalRef}>
        <Modal.Header closeButton={false}>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className='modalul'>
            <h6>File</h6>
            <li>{name}</li>
            <h6>Link</h6>
            <li>
              <a href={`${window.location.origin}/file/${shortId}`} ref={refe}>
                {`${window.location.origin}/file/${shortId}`}{' '}
              </a>
              <span className='clipspan'>
                {showCopiedMessage ? (
                  <span className='copied-message'>Copied!</span>
                ) : (
                  <i
                    className='bi bi-clipboard clip'
                    onClick={handleCopyClick}
                  ></i>
                )}
              </span>
            </li>
            <h6>Download count</h6>
            <li>{downloadCount}</li>
            <h6>Date</h6>
            <li>{date}</li>
            <h6>File size</h6>
            <li>{fileSize}</li>
            {/* <li onClick={onFileDelete}>
              <h3>Delete</h3>
            </li> */}
          </ul>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default MyModal;
