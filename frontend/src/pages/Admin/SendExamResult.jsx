import React, { useState, useEffect } from 'react';
import Displaystudents from '../../components/Displaystudents';
import {
  sendEmail,
  getStudents,
  deleteStudent,
  updateStudent,
} from '../../services/sendInfoService';
// import Nav from '../../components/Nav';
import './SendExamResult.css';
const SendExamResult = () => {
  // const [formData, setFormData] = useState({
  //   year: '',
  //   semester: '',
  //   major: '',
  // });
  const [students, setStudents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({
    Year: null,
    Semester: null,
    Major: null,
    Section: null,
  });

  // const handleSelectChange = (event) => {
  //   const { name, value } = event.target;
  //   console.log(prevOptions);
  //   setSelectedOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
  // };
  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    console.log('Event:', event);
    console.log('Current selectedOptions:', selectedOptions);
    setSelectedOptions((prevOptions) => {
      console.log('Previous selectedOptions:', prevOptions);
      return { ...prevOptions, [name]: value };
    });
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log('first');
  //     const res = await sendEmail(formData);
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  //   // Now you can send formData to your backend API
  //   // sendDataToBackend(formData);
  // };
  const handleDeleteStudent = async (id) => {
    try {
      await deleteStudent(id);
      const updatedStudents = students.filter((student) => student.id !== id);
      setStudents(updatedStudents);
    } catch (error) {
      console.error('Error deleting Student:', error.message);
    }
  };
  const handleUpdatedStudent = async (id, data) => {
    try {
      await updateStudent(id, data);
      const updatedStudents = students.map((student) => {
        if (student._id === id) {
          return {
            ...student,
            ...data,
          };
        }
        return student;
      });
      setStudents(updatedStudents);
    } catch (error) {
      console.error('Error updating URL:', error.message);
    }
  };
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents(
          selectedOptions.Year,
          selectedOptions.Semester,
          selectedOptions.Major,
          selectedOptions.Section
        );
        setStudents(response.data);
        // console.log('students in useeffect'+students);
      } catch (error) {
        console.error('Error fetching students:', error.message);
        setErrorMessage('Failed to fetch students. Please try again.');
      }
    };

    fetchStudents();
  }, [selectedOptions]);

  return (
    <div className='cont1'>
      {/* <Nav /> */}
      {/* <button onClick={handleSubmit}>sdfhajsdbfkjashdk</button> */}
      {/* <form className='mt-3 p-2'>
        <br />

        <h4 className='mb-0 text-start sto'>Send to:</h4>
        <div className='tooo'>
          <label className='col-form-label'>
            <select
              name='year'
              className='sss'
              value={formData.year}
              onChange={handleChange}
            >
              <option value=''>Select Year</option>
              <option value='First'>First</option>
              <option value='Second'>Second</option>
              <option value='Third'>Third</option>
              <option value='Fourth'>Fourth</option>
              <option value='Fifth'>Fifth</option>
            </select>
          </label>

          <label className='col-form-label'>
            <select
              className='sss'
              name='semester'
              value={formData.semester}
              onChange={handleChange}
            >
              <option value=''>Select Semester</option>
              <option value='First'>First</option>
              <option value='Second'>Second</option>
            </select>
            
          </label>
         
          <label className='col-form-label'>
            
            <select
              name='major'
              className='sss'
              value={formData.major}
              onChange={handleChange}
            >
              <option value=''>Select Major</option>
              <option value='CS'>CS</option>
              <option value='CT'>CT</option>
              <option value='CST'>CST</option>
            </select>
          </label>
        </div>

        <br />
        <button onClick={handleSubmit}>Send</button>
      </form> */}
      <div className='cont2'>
        <select
          name='Year'
          onChange={handleSelectChange}
          className='form-select m-2 year'
          size={3}
        >
          <option value='' selected>
            Select Year
          </option>
          <option value='First'>First</option>
          <option value='Second'>Second</option>
          <option value='Third'>Third</option>
          <option value='Fourth'>Fourth</option>
          <option value='Fifth'>Fifth</option>
        </select>

        <select
          name='Semester'
          onChange={handleSelectChange}
          className='form-select m-2 semester'
          size={3}
        >
          <option value='' selected>
            Select Semester
          </option>
          <option value='First'>First</option>
          <option value='Second'>Second</option>
        </select>

        <select
          name='Major'
          onChange={handleSelectChange}
          className='form-select m-2 major'
          size={3}
        >
          <option value='' selected>
            Select Major
          </option>
          <option value='CS'>Computer Science</option>
          <option value='CT'>Computer Technology</option>
          <option value='CST'>Computer Science and Technology</option>
        </select>

        <select
          name='Section'
          onChange={handleSelectChange}
          className='form-select m-2 section'
          size={3}
        >
          <option value='' selected>
            Select Section
          </option>
          <option value='A'>A</option>
          <option value='B'>B</option>
        </select>
        {/* <div>
          {console.log('Students:', students)}
          {students && students.length > 0 ? (
            students.map((student) => (
              <div key={student._id}>
                <span>{student.major}/ /</span>
                <span>{student.year}/ /</span>
                <span>{student.semester}/ /</span>
                <span>{student.section}/ /</span>
              </div>
            ))
          ) : (
            <p>No students to display</p>
          )}
        </div> */}
      </div>
      <div>
        <table className='table table-striped text-center table-hover'>
          <thead className='h5'>
            <tr>
              <td className='bg-secondary text-light'>NO</td>
              <td className='bg-secondary text-light'>Name</td>
              <td className='bg-secondary text-light'>Major</td>
              <td className='bg-secondary text-light'>Year</td>
              <td className='bg-secondary text-light'>Semester</td>
              <td className='bg-secondary text-light'>Section</td>
              <td className='bg-secondary text-light'></td>
            </tr>
          </thead>
          <tbody className='tbo h6'>
            {students && students.length > 0 ? (
              students.map((student, index) => (
                <Displaystudents
                  // className={`${isPremium ? 'donotshow' : 'show'}`}
                  key={student._id}
                  {...student}
                  onDelete={handleDeleteStudent}
                  onEdit={handleUpdatedStudent}
                  id={student._id}
                  no={index + 1}
                />
              ))
            ) : (
              <tr>
                <td>No students to display</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SendExamResult;
