import { useState } from 'react';
import React from 'react';

function Displaystudents(props) {
  const [showEdit, setshowEdit] = useState(false);
  const [editedValues, setEditedValues] = useState({
    section: props.section,
    semester: props.semester,
    year: props.year,
    major: props.major,
    name: props.name,
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
      name: props.name,
    });
    setshowEdit(false);
  };

  const handleEditClicks = () => {
    props.onEdit(props.id, editedValues);
    setshowEdit(!showEdit);
    console.log('handle edit clicks');
  };
  return (
    <tr>
      <td>
        <p className={`students ${showEdit ? 'noth' : 'hidep'}`}>NCLYM</p>
      </td>
      <td>
        <div className='bbbbb formobs fone text-center'>
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
      </td>
      <td>
        <div className='bbbbb formobs fone text-center'>
          {showEdit ? (
            <select
              className='formcoo'
              value={editedValues.major}
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
              {props.major}
            </p>
          )}
        </div>
      </td>
      <td>
        <div className='bbbbb formobs fone text-center'>
          {showEdit ? (
            <select
              className='formcoo'
              value={editedValues.year}
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
              {props.year}
            </p>
          )}
        </div>
      </td>
      <td>
        <div className='bbbbb formobs fone text-center'>
          {showEdit ? (
            <select
              className='formcoo'
              value={editedValues.semster}
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
              {props.semester}
            </p>
          )}
        </div>
      </td>
      <td>
        <button onClick={handleEdit}>Edit</button>
        {showEdit && (
          <>
            <button onClick={handleEditClicks}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        )}
      </td>
    </tr>
  );
}

export default Displaystudents;
