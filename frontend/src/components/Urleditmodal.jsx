import React from 'react';
import { useRef, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
const UrlModall = ({
  createdAt,
  creator,
  domain,
  hostingType,
  isActive,
  receievedCoin,
  updatedAt,
  views,
  v,
  id,
  show,
  handleClose,
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
          <Modal.Title>{domain}</Modal.Title>
          <div variant='secondary' onClick={handleClose}>
            Close{' '}
            <span className='mt-1' role='img' aria-label='close'>
              <i className='bi bi-x me-3 fs-4'></i>
            </span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <ul className='modalul'>
            <h6>Shorten url</h6>
            <li>{creator}</li>
            <br />
            <h6>Original Url</h6>
            <li>{domain}</li>
            <br />
            <h6>Password</h6>
            <li>{hostingType}</li>
            <br />
            <h6>Limit</h6>
            <li>{isActive}</li>
            <br />
            <h6>Date</h6>
            <li>{createdAt}</li>
            <br />
            <h6>Click Count</h6>
            <li>{views}</li>
          </ul>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default UrlModall;
