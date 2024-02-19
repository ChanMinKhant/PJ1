import React, { useState } from 'react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Now you can send formData to your backend API
    // sendDataToBackend(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Year:
        <select name='year' value={formData.year} onChange={handleChange}>
          <option value=''>Select Year</option>
          <option value='First'>First</option>
          <option value='Second'>Second</option>
          <option value='Third'>Third</option>
          <option value='Fourth'>Fourth</option>
          <option value='Fifth'>Fifth</option>
        </select>
      </label>
      <br />
      <label>
        Semester:
        <select
          name='semester'
          value={formData.semester}
          onChange={handleChange}
        >
          <option value=''>Select Semester</option>
          <option value='First'>First</option>
          <option value='Second'>Second</option>
        </select>
      </label>
      <br />
      <label>
        Major:
        <select name='major' value={formData.major} onChange={handleChange}>
          <option value=''>Select Major</option>
          <option value='CS'>CS</option>
          <option value='CT'>CT</option>
          <option value='CST'>CST</option>
        </select>
      </label>
      <br />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default SendExamResult;
