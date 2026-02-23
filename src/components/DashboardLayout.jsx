import React from 'react';
import Sidebar from './Sidebar.jsx';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="grid grid-cols-[300px_1fr] h-screen overflow-hidden">
      <Sidebar />
      <div className="h-screen overflow-y-auto p-10">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
