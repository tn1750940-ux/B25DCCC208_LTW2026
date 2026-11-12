import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404 - Không tìm thấy trang</h2>
      <p>
        <Link to="/">Về trang chủ</Link>
      </p>
    </div>
  );
};

export default NotFound;
