// import React, { useRef, useState } from 'react';
// import './CopyButton.css';
// import ModalBox from './../dashboard/modal';
// const CopyButton = (props) => {
//   //from
//   const [showModal, setShowModal] = useState(false);

//   const openModal = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };
//   //to
//   const textToCopyRef = useRef(null);
//   const [showCopiedMessage, setShowCopiedMessage] = useState(false);

//   const handleCopyClick = () => {
//     const range = document.createRange();
//     range.selectNode(textToCopyRef.current);

//     const selection = window.getSelection();
//     selection.removeAllRanges();
//     selection.addRange(range);

//     document.execCommand('copy');

//     // Deselect the text
//     selection.removeAllRanges();

//     // Show "Copied!" message for 2 seconds
//     setShowCopiedMessage(true);
//     setTimeout(() => {
//       setShowCopiedMessage(false);
//     }, 2000);

//     // Hide the "Copied!" message and show the clip icon again after 4 seconds
//     setTimeout(() => {
//       setShowCopiedMessage(false);
//     }, 4000);
//   };
//   const handleDeleteClick = () => {
//     // Invoke the onDelete function passed from the parent (ShortenUrlApp)
//     props.onDelete(props.shortUrl);
//   };
//   return (
//     <tr className='tableRow'>
//       <td className='addcpybtn'>
//         <a
//           className='surl'
//           href={props.url}
//           target='_blank'
//           rel='noopener noreferrer'
//           ref={textToCopyRef}
//           style={{ marginRight: '10px' }}
//         >
//           {`${window.location.origin}/url/${props.shortUrl}`}
//         </a>
//         <div className='clipdiv'>
//           {showCopiedMessage ? (
//             <span className='copied-message'>Copied!</span>
//           ) : (
//             <i className='bi bi-clipboard clip' onClick={handleCopyClick}></i>
//           )}
//         </div>
//       </td>
//       <td>{props.clickCount}</td>
//       <td>{props.isActive ? 'true' : 'false'}</td>
//       <td>{props.limit}</td>

//       <td className='url'>
//         {props.url}

//         {/* <div className='clipdiv'>
//           {showCopiedMessage ? (
//             <span className='copied-message'>Copied!</span>
//           ) : (
//             <i className='bi bi-clipboard clip' onClick={handleCopyClick}></i>
//           )}
//         </div> */}
//       </td>

//       <td className='btns'>
//         <div className='editbtn editdel'>Edit</div>
//         <span
//           onClick={openModal}
//           className='deletebtn editdel'
//           style={{ cursor: 'pointer' }}
//         >
//           Delete {/* Icon - You can use any icon or image here */}
//         </span>
//         <ModalBox showModal={showModal} closeModal={closeModal} />
//         <div className='deletebtn editdel' onClick={handleDeleteClick}>
//           Delete
//         </div>
//       </td>
//     </tr>
//   );
// };

// export default CopyButton;
import React, { useRef, useState } from 'react';
import './CopyButton.css';
import UrlModal from './UrlModal';
// import CopyComponent from './copy.jsx';
const CopyButton = (props) => {
  //from
  const [showEdit, setshowEdit] = useState(false);
  const [editedValues, setEditedValues] = useState({
    clickCount: props.clickCount,
    isActive: props.isActive,
    limit: props.limit,
    url: props.url,
  });

  // Update the handleEdit function
  const handleEdit = () => {
    // console.log('Before toggle: ', showEdit);
    if (showEdit) {
      // If currently in edit mode, cancel the edit operation
      setEditedValues({
        clickCount: props.clickCount,
        isActive: props.isActive,
        limit: props.limit,
        url: props.url,
      });
    }
    setshowEdit(!showEdit);
    // console.log('After toggle: ', showEdit);
  };
  const handleCancel = () => {
    // Reset edited values to the original values
    setEditedValues({
      clickCount: props.clickCount,
      isActive: props.isActive,
      limit: props.limit,
      url: props.url,
    });
    setshowEdit(false);
  };
  // const handleEdit = () => {
  //   console.log('Before toggle: ', showEdit);
  //   setshowEdit(!showEdit);
  //   console.log('After toggle: ', showEdit);
  // };

  //to
  const textToCopyRef = useRef(null);
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
    // setTimeout(() => {
    //   setShowCopiedMessage(false);
    // }, 4000);
  };
  const handleDeleteClick = () => {
    // Invoke the onDelete function passed from the parent (ShortenUrlApp)
    window.confirm('are u sure to delete');
    props.onDelete(props.shortUrl);
  };

  const handleNavagate = () => {
    window.open(`${window.location.origin}/url/${props.shortUrl}`);
  };
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <tr className='tableRow'>
      <td className='addcpybtn'>
        <p
          className='surl'
          href={props.url}
          target='_blank'
          rel='noopener noreferrer'
          ref={textToCopyRef}
          style={{ marginRight: '10px', cursor: 'pointer' }}
          onClick={handleNavagate}
        >
          {`${window.location.origin}/url/${props.shortUrl}`}
        </p>
        <div className='clipdiv'>
          {showCopiedMessage ? (
            <span className='copied-message'>Copied!</span>
          ) : (
            <i className='bi bi-clipboard clip' onClick={handleCopyClick}></i>
          )}
        </div>
      </td>
      <td className='bbbbb formobs fone'>
        <label className='msilalel'>Click count:</label>
        <p className={`datas ${showEdit ? 'hideinp' : 'notHide'}`}>
          {props.clickCount}
        </p>
        <input
          type='text'
          value={editedValues.clickCount}
          className={`formcon ${showEdit ? 'notHide' : 'hideinp'}`}
          onChange={(e) =>
            setEditedValues({ ...editedValues, clickCount: e.target.value })
          }
        />
      </td>
      <td className='bbbbb formobs sone'>
        <label className='msilalel'>IsActive:</label>
        <p className={`datas ${showEdit ? 'hideinp' : 'notHide'}`}>
          {props.isActive ? 'true' : 'false'}
        </p>
        <input
          type='text'
          value={editedValues.isActive}
          className={`formcon ${showEdit ? 'notHide' : 'hideinp'}`}
          onChange={(e) =>
            setEditedValues({ ...editedValues, isActive: e.target.value })
          }
        />
      </td>
      <td className='bbbbb formobs fone'>
        <label className='msilalel'>Limit:</label>
        <p className={`datas ${showEdit ? 'hideinp' : 'notHide'}`}>
          {props.limit}
        </p>
        <input
          type='number'
          name=''
          id=''
          className={`formcon ${showEdit ? 'notHide' : 'hideinp'}`}
          value={editedValues.limit}
          onChange={(e) =>
            setEditedValues({ ...editedValues, limit: e.target.value })
          }
        />
      </td>

      <td className='url bbbbb formobs sone'>
        <label className='msilalel'>Original url:</label>
        <p className={`datas ${showEdit ? 'hideinp' : 'notHide'}`}>
          {props.url}
        </p>
        <input
          type='text'
          name=''
          id=''
          className={`formcon ${showEdit ? 'notHide' : 'hideinp'}`}
          value={editedValues.url}
          onChange={(e) =>
            setEditedValues({ ...editedValues, url: e.target.value })
          }
        />

        {/* <div className='clipdiv'>
          {showCopiedMessage ? (
            <span className='copied-message'>Copied!</span>
          ) : (
            <i className='bi bi-clipboard clip' onClick={handleCopyClick}></i>
          )}
        </div> */}
      </td>

      <td className='btns'>
        <div
          className={`editbtn editdel ${showEdit ? 'hideinp' : 'notHide'}`}
          onClick={handleEdit}
        >
          Edit
        </div>
        <div
          className={`deletebtn editdel ${showEdit ? 'hideinp' : 'notHide'}`}
          onClick={handleDeleteClick}
        >
          Delete
        </div>
        <i
          className='bi bi-three-dots-vertical me-3 fs-3.5 '
          onClick={handleShowModal}
        ></i>
        <div>
          <UrlModal show={showModal} handleClose={handleCloseModal} />
        </div>
        {/* <td className={`editbtn editdel ${showEdit ? 'hideinp' : 'notHide'}`}> */}
        <div
          className={`btnsss ${showEdit ? 'notHide' : 'hideinp'}`}
          onClick={handleEdit}
        >
          Edit
        </div>
        {/* {`btnsss ${showEdit ? 'notHide' : 'hideinp'}`} */}
        <div
          className={`btnsss ${showEdit ? 'notHide' : 'hideinp'}`}
          onClick={handleCancel}
          origin={props.url}
          shorten={props.shortUrl}
          password={props.password}
          limit={props.limit}
        >
          cancle
        </div>
        {/* </td> */}
        {/* <ModalBox showModal={showModal} closeModal={closeModal} /> */}
      </td>
    </tr>
  );
};

export default CopyButton;
