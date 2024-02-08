// import React, { useState } from 'react';

// const ModalBox = ({ showModal, closeModal }) => {
//   const modalStyle = {
//     display: showModal ? 'block' : 'none',
//   };

//   return (
//     <div className='modal' style={modalStyle}>
//       <div className='modal-content'>
//         <span className='close' onClick={closeModal}>
//           &times;
//         </span>
//         <h2>Modal Box</h2>
//         <p>This is a modal box component with a cancel button.</p>
//         <button onClick={closeModal}>Cancel</button>
//         {/* <div className='deletebtn editdel' onClick={handleDeleteClick}>
//           Delete
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default ModalBox;
// ModalBox.js

import React, { useState } from 'react';
// import './ModalBox.css';

const ModalBox = ({ showModal, closeModal, onEdit, onDelete, data }) => {
  const [input1, setInput1] = useState(data.input1 || '');
  const [input2, setInput2] = useState(data.input2 || '');
  const [input3, setInput3] = useState(data.input3 || '');

  const handleEditClick = () => {
    // Pass the edited data to the parent component
    onEdit({ input1, input2, input3 });
    closeModal();
  };

  const handleDeleteClick = () => {
    // Pass the data to be deleted to the parent component
    onDelete(data);
    closeModal();
  };

  return (
    <div className={`modal ${showModal ? 'show' : 'hide'}`}>
      <div className='modal-content'>
        <span className='close' onClick={closeModal}>
          &times;
        </span>
        <h2>Edit Data</h2>
        <label htmlFor='input1'>Input 1:</label>
        <input
          type='text'
          id='input1'
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />

        <label htmlFor='input2'>Input 2:</label>
        <input
          type='text'
          id='input2'
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />

        <label htmlFor='input3'>Input 3:</label>
        <input
          type='text'
          id='input3'
          value={input3}
          onChange={(e) => setInput3(e.target.value)}
        />

        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    </div>
  );
};

export default ModalBox;
