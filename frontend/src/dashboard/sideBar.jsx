import './sideBar.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import useIsLogined from '../hooks/useIsLogined';
function SideBar() {
  const { isLogined, loading, isAdmin } = useIsLogined();
  if (!loading)
    return (
      <div className='sidebar p-2 '>
        <hr className='text-dark' />
        <div className='lgc list-group list-group-flush'>
          <Link to='/home' className='list-group-item py-2 in'>
            <i className='bi bi-house fs-5 me-3'></i>
            <span className='sbil fs-5'>Home</span>
          </Link>
          {isLogined && (
            <Link to='/Store' className='list-group-item py-2 in'>
              <i className='bi bi-cart fs-5 me-3'></i>
              <span className='sbil fs-5'>Store</span>
            </Link>
          )}
          {isLogined && (
            <Link to='/dashboard/host' className='list-group-item py-2 in'>
              <i className='bi bi-globe fs-5 me-3'></i>
              <span className='sbil fs-5'>Host</span>
            </Link>
          )}
          <Link to='/dashboard/url' className='list-group-item py-2 in'>
            <i className='bi bi-link-45deg fs-5 me-3'></i>
            <span className='sbil fs-5'>Url</span>
          </Link>
          <Link to='/dashboard/files' className='list-group-item py-2 in'>
            <i className='bi bi-file-earmark fs-5 me-3'></i>
            <span className='sbil fs-5'>File</span>
          </Link>
          {isAdmin && (
            <Link to='/dashboard/sendInfo' className='list-group-item py-2 in'>
              <i className='bi bi-file-earmark fs-5 me-3'></i>
              <span className='sbil fs-5'>Send Info</span>
            </Link>
          )}
          <div className='iinn'></div>
        </div>
      </div>
    );
}
export default SideBar;
