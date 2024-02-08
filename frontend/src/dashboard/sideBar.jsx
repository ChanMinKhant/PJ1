import './sideBar.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
function SideBar() {
  return (
    <div className='sidebar p-2 '>
      <div className='m-2'>
        <i className='bi bi-bootstrap-fill me-3 fs-4'></i>
        <span className='sbil fs-5'>user</span>
      </div>
      <hr className='text-dark' />
      <div
        className='lgc list-group list-group-flush'
        style={{
          backgroundColor: '#f1f5f8',
        }}
      >
        <Link to='/home' className='list-group-item py-2 in'>
          <i className='bi bi-house fs-5 me-3'></i>
          <span className='sbil fs-5'>Home</span>
        </Link>
        <Link to='/Store' className='list-group-item py-2 in'>
          <i className='bi bi-cart fs-5 me-3'></i>
          <span className='sbil fs-5'>Store</span>
        </Link>
        <Link to='/dashboard/host' className='list-group-item py-2 in'>
          <i className='bi bi-globe fs-5 me-3'></i>
          <span className='sbil fs-5'>Host</span>
        </Link>
        <Link to='/dashboard/url' className='list-group-item py-2 in'>
          <i className='bi bi-link-45deg fs-5 me-3'></i>
          <span className='sbil fs-5'>Url</span>
        </Link>
        <Link to='/dashboard/files' className='list-group-item py-2 in'>
          <i className='bi bi-file-earmark fs-5 me-3'></i>
          <span className='sbil fs-5'>File</span>
        </Link>
        <div className='iinn'></div>
      </div>
    </div>
  );
}
export default SideBar;
