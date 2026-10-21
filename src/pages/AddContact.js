import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GROUPS } from '../data';

const AddContact = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [group, setGroup] = useState('Bạn bè');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedPhone || !trimmedEmail || !group) {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (!/^0\d{9}$/.test(trimmedPhone)) {
      setErrorMessage('Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0');
      return;
    }

    if (!trimmedEmail.includes('@')) {
      setErrorMessage('Email không hợp lệ');
      return;
    }

    setErrorMessage('');
    onAdd({
      name: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail,
      group,
    });
    navigate('/contacts', { replace: true });
  };

  return (
    <div>
      <form className="add-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Họ tên</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Số điện thoại</label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="group">Nhóm</label>
          <select
            id="group"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          >
            {GROUPS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Thêm</button>
      </form>
      {errorMessage && <p className="error-msg">{errorMessage}</p>}
    </div>
  );
};

export default AddContact;
