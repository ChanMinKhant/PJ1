import React, { useState } from 'react';
import { sendEmail } from '../../services/sendInfoService';
import Nav from '../../components/Nav';
import './SendExamResult.css';
const SendExamResult = () => {
  const [formData, setFormData] = useState({
    year: '',
    semester: '',
    major: '',
  });

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
      console.log(error.response?.data?.message);
    }
    // Now you can send formData to your backend API
    // sendDataToBackend(formData);
  };

  return (
    <div className='cont'>
      {/* <Nav /> */}
      <button onClick={handleSubmit}>sdfhajsdbfkjashdk</button>
      <form className='mt-3 p-2'>
        {/* <table border={1}>
          <tr>
            <td> */}

        <br />
        {/* </td> */}

        {/* <td> */}
        <h4 className='mb-0 text-start sto'>Send to:</h4>
        <div className='tooo'>
          {/* <div className='mb-0 text-start sto'>
            Choose Major, Semester and Year to send
          </div> */}
          {/* <label htmlFor=''>To:</label> */}
          <label className='col-form-label'>
            {/* <div className='row'> */}
            {/* Year: */}
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
          {/* <br /> */}
          <label className='col-form-label'>
            {/* Semester: */}
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
        {/* </td>
          </tr>
          <tr>
            <td>
              <div className='col'>Subject:</div>
            </td>
            <td>
              <div className='subject'>
                <input type='text' name='' id='' className='coll' />
              </div>
            </td>
          </tr> */}
        <br />
        <button type='submit' className='btn btn-primary'>
          Send
        </button>
        {/* </table> */}
      </form>
    </div>
  );
};

export default SendExamResult;
