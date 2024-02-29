import { useState } from 'react';
import React from 'react';
import './DisplayStudent.css';
import StudentModal from './StudentModal';
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
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
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
      <td className='text-center btnss'>
        <span
          onClick={handleEdit}
          className={`editbtn editdel ${showEdit ? 'hidep' : 'noth'}`}
          // className={`editbtn editdel ${showEdit ? 'noth' : 'hidep'}`}
        >
          Edit
        </span>
        <span
          onClick={handleDeleteClick}
          className={`deletebtn editdel ${showEdit ? 'hidep' : 'noth'}`}
        >
          Delete
        </span>
        <i
          className={`bi bi-three-dots-vertical me-3 fs-4 ${
            showEdit ? 'hidep' : 'noth'
          }`}
          onClick={handleShowModal}
        ></i>
        <div>
          <StudentModal
            show={showModal}
            handleClose={handleCloseModal}
            // name={props.name}
            semester={props.semester}
            year={props.year}
            section={props.section}
            major={props.major}
            email={props.studentEmail}
            rollNo={props.rollNo}
          />
        </div>
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
