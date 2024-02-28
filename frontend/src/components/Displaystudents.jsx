import { useState } from 'react';
import React from 'react';
import './DisplayStudent.css';
function Displaystudents(props) {
  const [showEdit, setshowEdit] = useState(false);
  const [editedValues, setEditedValues] = useState({
    section: props.section,
    semester: props.semester,
    year: props.year,
    major: props.major,
    // name: props.name,
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
  const handleDeleteClick = () => {
    // Invoke the onDelete function passed from the parent (ShortenUrlApp)
    window.confirm('are u sure to delete');
    props.onDelete(props.id);
    console.log('handle delete clicks', props.id);
  };
  // console.log('props.section', props.section);
  return (
    <tr>
      <td>{props.no}</td>
      <td>
        <p className={`students ${showEdit ? 'hidep' : 'noth'}`}>NCLYM</p>
      </td>

      <td>
        <div className='bbbbb formobs fone text-center'>
          {showEdit ? (
            <select
              className='formcoo'
              value={editedValues.major}
              onChange={(e) => {
                setEditedValues({ ...editedValues, major: e.target.value });
                console.log(e.target.value);
              }}
            >
              <option value='CS'>Computer Science</option>
              <option value='CT'>Computer Technology</option>
              <option value='CST'>Computer Science and Technology</option>
              {/* Add more options as needed */}
            </select>
          ) : (
            <p className={`students ${showEdit ? 'hidep' : 'noth'}`}>
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
                setEditedValues({ ...editedValues, year: e.target.value });
                console.log(e.target.value);
              }}
            >
              <option value=''>Select Year</option>
              <option value='First'>First</option>
              <option value='Second'>Second</option>
              <option value='Third'>Third</option>
              <option value='Fourth'>Fourth</option>
              <option value='Fifth'>Fifth</option>
              {/* Add more options as needed */}
            </select>
          ) : (
            <p className={`students ${showEdit ? 'hidep' : 'noth'}`}>
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
              value={editedValues.semester}
              onChange={(e) => {
                setEditedValues({ ...editedValues, semester: e.target.value });
                console.log(e.target.value);
              }}
            >
              <option value=''>Select Semester</option>
              <option value='First'>First</option>
              <option value='Second'>Second</option>
              {/* Add more options as needed */}
            </select>
          ) : (
            <p className={`students ${showEdit ? 'hidep' : 'noth'}`}>
              {props.semester}
            </p>
          )}
        </div>
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
              <option value=''>Select Section</option>
              <option value='A'>A</option>
              <option value='B'>B</option>
              {/* Add more options as needed */}
            </select>
          ) : (
            <p className={`students ${showEdit ? 'hidep' : 'noth'}`}>
              {props.section}
            </p>
          )}
        </div>
      </td>
      <td>
        <button
          onClick={handleEdit}
          className={`editbtn ${showEdit ? 'hidep' : 'noth'}`}
        >
          Edit
        </button>
        <button
          onClick={handleDeleteClick}
          className={`deletebtn ${showEdit ? 'hidep' : 'noth'}`}
        >
          Delete
        </button>
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
