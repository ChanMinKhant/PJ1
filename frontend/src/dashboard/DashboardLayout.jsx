import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/nav';
//import outlet

const DashboardLayout = () => {
  return (
    <div>
      <Nav></Nav>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
