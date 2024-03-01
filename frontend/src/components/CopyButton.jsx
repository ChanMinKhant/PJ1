import React, { useRef, useState } from 'react';
import './CopyButton.css';
import UrlModal from './UrlModal';
import deleteIcon from '../../assets/delete.png';
import editIcon from '../../assets/edit.png';
import Switch from './Switch.jsx';
// import CopyComponent from './copy.jsx';
const CopyButton = (props) => {
  //from
  const [showEdit, setshowEdit] = useState(false);
  const [editedOnmodal, setEditedOnmodal] = useState(false);
  const [editedLimit, setEditedLimit] = useState('');
  const [editedValues, setEditedValues] = useState({
    clickCount: props.clickCount,
    isActive: props.isActive,
    limit: props.limit,
    shortUrl: props.shortUrl,
    password: props.password,
  });
  const handleEditedOnmodal = () => {
    setEditedOnmodal(!editedOnmodal);
    console.log('handle edited on modal', editedOnmodal);
  };
  // Update the handleEdit function
  const handleEdit = () => {
    // console.log('Before toggle: ', showEdit);
    if (showEdit) {
      // If currently in edit mode, cancel the edit operation
      setEditedValues({
        clickCount: props.clickCount,
        isActive: props.isActive,
        limit: props.limit,
        shortUrl: props.shortUrl,
        password: props.password,
      });
    }
    setshowEdit(!showEdit);
    // console.log('After toggle: ', showEdit);
  };
  const handleEditClicks = () => {
    props.onEdit(props.shortUrl, editedValues);
    setshowEdit(false);
    setEditedOnmodal(false);
    console.log('handle edit clicks');
  };
  const handleEditedCancle = () => {
    setEditedOnmodal(!editedOnmodal);
  };
  const handleCancel = () => {
    // Reset edited values to the original values
    setEditedValues({
      clickCount: props.clickCount,
      isActive: props.isActive,
      limit: props.limit,
      shortUrl: props.shortUrl,
      password: props.password,
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
  const dateObject = new Date(props.createdAt);
  console.log(props.isPremium);
  // Format the date using toLocaleString()
  const formattedDateurl = dateObject.toLocaleString();
  return (
    <tr className='tabl '>
      <td className='addcpybtn text-center'>
        <div className={`clipdivdiv ${showEdit ? 'hideinp' : 'notHide'}`}>
          <div className='clipdiv'>
            {showCopiedMessage ? (
              <span className='copied-message'>Copied!</span>
            ) : (
              <i className='bi bi-clipboard clip' onClick={handleCopyClick}></i>
            )}
          </div>
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
        </div>

        <div></div>
        {props.isPremium ? (
          <>
            <input
              type='text'
              value={editedValues.shortUrl}
              className={`formcon ${showEdit ? 'notHide' : 'hideinp'}`}
              onChange={(e) =>
                setEditedValues({ ...editedValues, shortUrl: e.target.value })
              }
            />
          </>
        ) : (
          <p
            className={`surl ${showEdit ? 'notHide' : 'hideinp'}`}
          >{`${window.location.origin}/url/${props.shortUrl}`}</p>
        )}
      </td>
      <td className='clickcount formobs fone text-center'>
        <label className='msilalel'>Click count:</label>
        <p className='datas'>{props.clickCount}</p>
        {/* <input
          type='text'
          value={editedValues.clickCount}
          className={`formcon ${showEdit ? 'notHide' : 'hideinp'}`}
          onChange={(e) =>
            setEditedValues({ ...editedValues, clickCount: e.target.value })
          }
        /> */}
      </td>
      {/* <td className='bbbbb formobs sone'>
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
      </td> */}
      {/* from */}

      {/* <td className='bbbbb formobs sone'>
        <label className='msilalel'>IsActive:</label>
        <p className={`datas ${showEdit ? 'hideinp' : 'notHide'}`}>
          {props.isActive ? 'true' : 'false'}
        </p>
        <Switch
          isToggled={editedValues.isActive}
          onToggle={() =>
            setEditedValues({
              ...editedValues,
              isActive: !editedValues.isActive,
            })
          }
        />
      </td> */}

      {/* to */}
      <td className='bbbbb formobs fone text-center'>
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

      {/* <td className='url bbbbb formobs sone'>
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
      </td> */}

      <td className='btnss text-center'>
        {/* <span
          className={`editbtn lap editdel ${showEdit ? 'hideinp' : 'notHide'}`}
          onClick={handleEdit}
        >
          Edit
        </span> */}
        <span
          className={`deletebtn lap editdel ${
            showEdit ? 'hideinp' : 'notHide'
          }`}
          onClick={handleDeleteClick}
        >
          Delete
        </span>
        <span
          className={`  mob  ${showEdit ? 'hideinp' : 'notHide'}`}
          onClick={handleEdit}
        >
          <img src={editIcon} alt='' />
        </span>
        <span
          className={` mob  ${showEdit ? 'hideinp' : 'notHide'}`}
          onClick={handleDeleteClick}
        >
          <img src={deleteIcon} alt='' />
        </span>
        <i
          className={`bi bi-three-dots-vertical me-3 fs-4 ${
            showEdit ? 'hideinp' : 'notHide'
          }`}
          onClick={handleShowModal}
        ></i>
        <div>
          <UrlModal
            show={showModal}
            handleClose={handleCloseModal}
            origin={props.url}
            shorten={props.shortUrl}
            password={props.password}
            limit={props.limit}
            clickCount={props.clickCount}
            isActive={props.isActive}
            createdAt={formattedDateurl}
            editedValues={editedValues}
            setEditedValues={setEditedValues}
            editclick={handleEditClicks}
            editedOnmodal={editedOnmodal}
            handle={handleEditedOnmodal}
            isPremium={props.isPremium}
            handleEditedCancle={handleEditedCancle}
          />
        </div>
        {/* <td className={`editbtn editdel ${showEdit ? 'hideinp' : 'notHide'}`}> */}
        <div className='btnsssdiv'>
          <div
            className={`btnsss ${showEdit ? 'notHide' : 'hideinp'}`}
            onClick={handleEditClicks}
          >
            Save
          </div>
          {/* {`btnsss ${showEdit ? 'notHide' : 'hideinp'}`} */}
          <div
            className={`btnsss ${showEdit ? 'notHide' : 'hideinp'}`}
            onClick={handleCancel}
          >
            Cancle
          </div>
        </div>
        {/* </td> */}
        {/* <ModalBox showModal={showModal} closeModal={closeModal} /> */}
      </td>
    </tr>
  );
};

export default CopyButton;
