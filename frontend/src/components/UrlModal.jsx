import React from 'react';
import { useRef, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import editIcon from '../../assets/edit.png';
import './UrlModal.css';
const UrlModal = ({
  show,
  handleClose,
  origin,
  shorten,
  password,
  limit,
  isActive,
  clickCount,
  createdAt,
  editedOnmodal,
  setEditedValues,
  handle,
  isPremium,
  handleEditedCancle,
  editclick,
  editedValues,
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
          <Modal.Title>{shorten}</Modal.Title>
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
            <li>{shorten}</li>
            <br />
            <h6>Original Url</h6>
            <li>{origin}</li>
            <br />
            {/* {isPremium ? ( */}
            {/* <> */}
            <h6>Password</h6>
            <li className={`passwrd ${editedOnmodal ? 'hideinp' : 'notHide'}`}>
              {password ? password : null}{' '}
              <img
                src={editIcon}
                alt=''
                className={`editicon ${editedOnmodal ? 'hideinp' : 'notHide'}`}
                onClick={handle}
              />
            </li>
            {/* </> */}
            {/* ) : null} */}
            <li
              className={`editpassword ${
                editedOnmodal ? 'notHide' : 'hideinp'
              }`}
            >
              <input
                type='password'
                value={editedValues.password}
                onChange={(e) =>
                  setEditedValues({ ...editedValues, password: e.target.value })
                }
              />
              <div>
                <span className='btnsss' onClick={editclick}>
                  save
                </span>
                <span className='btnsss' onClick={handleEditedCancle}>
                  cancle
                </span>
              </div>
            </li>
            <br />
            <h6>Limit</h6>
            <li>{limit}</li>
            <br />
            <h6>Date</h6>
            <li>{createdAt}</li>
            <br />
            <h6>Click Count</h6>
            <li>{clickCount}</li>
          </ul>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default UrlModal;
