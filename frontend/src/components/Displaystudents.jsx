import { useState } from 'react';
import React from 'react';

function Displaystudents(props) {
  const [showEdit, setshowEdit] = useState(false);
  const [editedValues, setEditedValues] = useState({
    section: props.section,
    semester: props.semester,
    year: props.year,
    major: props.major,
  });
  const handleEdit = () => {
    // props.onEdit(props.id, editedValues);
    setshowEdit(!showEdit);
    // console.log('handle edit clicks');
  };
  const handleCancel = () => {
    setEditedValues({
      section: props.section,
      semester: props.semester,
      year: props.year,
      major: props.major,
    });
    setshowEdit(false);
  };

  const handleEditClicks = () => {
    props.onEdit(props.id, editedValues);
    setshowEdit(!showEdit);
    console.log('handle edit clicks');
  };
  return (
    <div>
      <div className='bbbbb formobs fone text-center'>
        <label className='stlab'>Section:</label>
        {showEdit ? (
          <select
            className='formcoo'
            value={editedValues.section}
            onChange={(e) => {
              setEditedValues({ ...editedValues, section: e.target.value });
              console.log(e.target.value);
            }}
          >
            <option value='A'>A</option>
            <option value='B'>B</option>
            {/* Add more options as needed */}
          </select>
        ) : (
          <p className={`students ${showEdit ? 'noth' : 'hidep'}`}>
            {props.section}
          </p>
        )}
      </div>
      <button onClick={handleEdit}>Edit</button>
      {showEdit && (
        <>
          <button onClick={handleEditClicks}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      )}
    </div>
  );
}

export default Displaystudents;
