import React from 'react';
import { useRef, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
const StudentModal = ({
  major,
  section,
  semester,
  year,
  name,
  show,
  handleClose,
  email,
  rollNo,
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
          <Modal.Title>Nyein Chan Aung</Modal.Title>
          <div variant='secondary' onClick={handleClose}>
            Close{' '}
            <span className='mt-1' role='img' aria-label='close'>
              <i className='bi bi-x me-3 fs-4'></i>
            </span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <ul className='modalul'>
            <h6>Name:</h6>
            <li>Nyein Chan Aung</li>
            <br />
            <h6>Major:</h6>
            <li>{major}</li>
            <br />
            <h6>Year</h6>
            <li>{year}</li>
            <br />
            <h6>Section:</h6>
            <li>{semester}</li>
            <br />
            <h6>Semester:</h6>
            <li>{section}</li>
            <br />
            <h6>Email:</h6>
            <li>{email}</li>
            <h6>Roll no:</h6>
            <li>{rollNo}</li>
          </ul>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default StudentModal;
