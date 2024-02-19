import React from 'react';
import { useRef, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
const UrlModal = ({ show, handleClose, url, shorturl, passowrd, limit }) => {
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
          <Modal.Title>test</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Shorten url</h6>
          <li>{shorturl}</li>
          <h6>Original Url</h6>
          <li>{url}</li>
          <h6>Password</h6>
          <li>{passowrd}</li>
          <h6>Limit</h6>
          <li>{limit}</li>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default UrlModal;
