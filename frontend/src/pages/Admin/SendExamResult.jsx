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
  const [formData, setFormData] = useState({
    year: '',
    semester: '',
    major: '',
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('first');
      const res = await sendEmail(formData);
      console.log(res);
    } catch (error) {
      console.log(error.response);
    }
    // Now you can send formData to your backend API
    // sendDataToBackend(formData);
  };
  const handleDeleteStudent = async (id) => {
    try {
      await deleteStudent(shortUrl);
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
          selectedOptions.Section,
        );
        setStudents(response.data);
        console.log('response::', response);
        console.log('response.data::', response.data);
        console.log('selectedOptions.Year::', selectedOptions.Year);
        // console.log('students in useeffect'+students);
      } catch (error) {
        console.error('Error fetching students:', error.message);
        setErrorMessage('Failed to fetch students. Please try again.');
      }
    };

    fetchStudents();
  }, [selectedOptions]);

  return (
    <div className='cont'>
      {/* <Nav /> */}
      <button onClick={handleSubmit}>sdfhajsdbfkjashdk</button>
      <form className='mt-3 p-2'>
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
            {/* </div> */}
          </label>
          {/* <br /> */}
          <label className='col-form-label'>
            {/* Major: */}
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
        <button type='submit' className='btn btn-primary'>
          Send
        </button>
      </form>
      <div>
        <select name='Year' onChange={handleSelectChange}>
          <option value=''>Select Year</option>
          <option value='First'>First</option>
          <option value='Second'>Second</option>
          <option value='Third'>Third</option>
          <option value='Fourth'>Fourth</option>
          <option value='Fifth'>Fifth</option>
        </select>

        <select name='Semester' onChange={handleSelectChange}>
          <option value=''>Select Semester</option>
          <option value='First'>First</option>
          <option value='Second'>Second</option>
        </select>

        <select name='Major' onChange={handleSelectChange}>
          <option value=''>Select Major</option>
          <option value='CS'>Computer Science</option>
          <option value='CT'>Computer Technology</option>
          <option value='CST'>Computer Science and Technology</option>
        </select>

        <select name='Section' onChange={handleSelectChange}>
          <option value=''>Select Section</option>
          <option value='A'>A</option>
          <option value='B'>B</option>
        </select>
        <div>
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
        </div>
        <div className='tbo'>
          {students.map((student) => (
            <Displaystudents
              // className={`${isPremium ? 'donotshow' : 'show'}`}
              key={student._id}
              {...student}
              onDelete={handleDeleteStudent}
              onEdit={handleUpdatedStudent}
              id={student._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SendExamResult;
