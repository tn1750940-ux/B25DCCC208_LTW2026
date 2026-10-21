import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ loading = false, error = null }) => {
  return (
    <div>
      <NavBar />
      <main className="container">
        {loading ? (
          <p>Đang tải...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default Layout;
