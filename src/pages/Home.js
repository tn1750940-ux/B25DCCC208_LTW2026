import React from 'react';

const Home = ({ contacts = [] }) => {
  const totalContacts = contacts.length;
  const favoriteContacts = contacts.reduce(
    (acc, { favorite }) => (favorite ? acc + 1 : acc),
    0
  );
  const gmailContacts = contacts.reduce(
    (acc, { email }) =>
      email.toLowerCase().endsWith('@gmail.com') ? acc + 1 : acc,
    0
  );

  return (
    <div>
      <h1>Danh bạ</h1>
      <p>{`Tổng số liên hệ: ${totalContacts}`}</p>
      <p>{`Số liên hệ yêu thích: ${favoriteContacts}`}</p>
      <p>{`Số liên hệ dùng Gmail: ${gmailContacts}`}</p>
    </div>
  );
};

export default Home;
