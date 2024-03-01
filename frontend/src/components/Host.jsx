import React from 'react';
import './host.css';
import { useRef, useState } from 'react';
import UrlModall from './Urleditmodal';
const Host = (props) => {
  const textToCopy = useRef(null);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCopy = () => {
    const range = document.createRange();
    range.selectNode(textToCopy.current);

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
  };
  const dateObject = new Date(props.createdAt);

  // Format the date using toLocaleString()
  const formattedDate = dateObject.toLocaleString();
  return (
    // <tr>

    <tr>
      <td>
        <a
          target='_blank'
          rel='noopener noreferrer'
          ref={textToCopy}
          style={{ marginRight: '10px', cursor: 'pointer' }}
          href={`http://${props.domain}.${window.location.host}`}
        >
          {`http://${props.domain}.${window.location.host}`}
        </a>
      </td>
      <td className='d-flex justify-content-start align-items-center'>
        {showCopiedMessage ? (
          <span className='copied-message1'>Copied!</span>
        ) : (
          <i onClick={handleCopy} className='bi bi-clipboard me-3 fs-3.5'></i>
        )}
        <i
          className='bi bi-three-dots-vertical me-3 fs-4'
          onClick={handleShowModal}
        ></i>
        <UrlModall
          createdAt={formattedDate}
          creator={props.creator}
          domain={props.domain}
          hostingType={props.hostingType}
          isActive={props.isActive}
          receievedCoin={props.receievedCoin}
          updatedAt={formattedDate}
          views={props.views}
          v={props.__v}
          id={props._id}
          show={showModal}
          handleClose={handleCloseModal}
        />
      </td>
    </tr>
  );
};

export default Host;
