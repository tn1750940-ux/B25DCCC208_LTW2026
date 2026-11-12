import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ loading = false, error = null }) => {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="container">
        {loading ? (
          <p className="status-msg">Đang tải câu hỏi...</p>
        ) : error ? (
          <p className="error-msg">{error}</p>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default Layout;
