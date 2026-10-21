import React from 'react';
import { Link } from 'react-router-dom';

const ContactRow = ({ contact, onToggleFavorite, onDelete }) => {
  const { id, name, phone, email, group, favorite } = contact;

  return (
    <tr className={favorite ? 'favorite-row' : ''}>
      <td>
        <Link to={`/contacts/${id}`}>{name}</Link>
      </td>
      <td>{phone}</td>
      <td>{email}</td>
      <td>{group}</td>
      <td>
        <button
          type="button"
          className="action-btn"
          onClick={() => onToggleFavorite(id)}
        >
          {favorite ? 'Bỏ yêu thích' : 'Yêu thích'}
        </button>
        <button
          type="button"
          className="action-btn"
          onClick={() => onDelete(id)}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default ContactRow;
