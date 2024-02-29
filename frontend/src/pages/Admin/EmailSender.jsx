import React from 'react';

const EmailSender = ({ sendOptions, handleChange, handleSendEmail }) => {
  return (
    <div className='examresult'>
      <form className='mt-3 p-2'>
        <div className='tooo'>
          <h4 className='mb-0 text-start sto'>Send to:</h4>
          <label className='col-form-label cco'>
            <select
              name='year'
              className='sss form-select'
              value={sendOptions.year}
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

          <label className='col-form-label cco'>
            <select
              className='sss form-select'
              name='semester'
              value={sendOptions.semester}
              onChange={handleChange}
            >
              <option value=''>Select Semester</option>
              <option value='First'>First</option>
              <option value='Second'>Second</option>
            </select>
          </label>

          <label className='col-form-label cco'>
            <select
              name='major'
              className='sss form-select'
              value={sendOptions.major}
              onChange={handleChange}
              aria-label='Default select example'
            >
              <option value=''>Select Major</option>
              <option value='CS'>CS</option>
              <option value='CT'>CT</option>
              <option value='CST'>CST</option>
            </select>
          </label>
          <label className='col-form-label cco'>
            <select
              className='sss form-select'
              name='section'
              value={sendOptions.section}
              onChange={handleChange}
            >
              <option value=''>Select Section</option>
              <option value='A'>A</option>
              <option value='B'>B</option>
            </select>
          </label>
          <button
            onClick={handleSendEmail}
            className='btn btn-danger btn-lg btn-block'
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
export default EmailSender;
