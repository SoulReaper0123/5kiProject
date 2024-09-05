import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebHome from '../web/WebHome';
import AdminLoginPage from '../web/AdminLoginPage';
import SuperAdminLoginPage from '../web/SuperAdminLoginPage';
import EmployeeLoginPage from '../web/EmployeeLoginPage'

const WebNav = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WebHome />} />
        <Route path="/adminlogin" element={<AdminLoginPage />} />
        <Route path="/superadminlogin" element={<SuperAdminLoginPage />} />
        <Route path="/employeelogin" element={<EmployeeLoginPage />} />
      </Routes>
    </Router>
  );
};

export default WebNav;
