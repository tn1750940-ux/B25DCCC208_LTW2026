import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" end>
        Trang chủ
      </NavLink>
      <NavLink to="/questions">
        Ngân hàng câu hỏi
      </NavLink>
      <NavLink to="/history">
        Lịch sử
      </NavLink>
    </nav>
  );
};

export default NavBar;
