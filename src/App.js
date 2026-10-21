import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import ContactList from './pages/ContactList';
import AddContact from './pages/AddContact';
import ContactDetail from './pages/ContactDetail';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedContacts = localStorage.getItem('gk_contacts');
    if (savedContacts) {
      const parsed = JSON.parse(savedContacts).map((item) => ({
        ...item,
        id: Number(item.id),
      }));
      setContacts(parsed);
      setLoading(false);
      return undefined;
    }

    const controller = new AbortController();

    const fetchContacts = async () => {
      try {
        const res = await axios.get('/data/contacts.json', {
          signal: controller.signal,
        });
        const formatted = res.data.map((item) => ({
          ...item,
          id: Number(item.id),
        }));
        setContacts(formatted);
        setLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        setError('Không tải được dữ liệu.');
        setLoading(false);
      }
    };

    fetchContacts();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('gk_contacts', JSON.stringify(contacts));
    }
  }, [contacts, loading]);

  const handleAddContact = (newContactData) => {
    const maxId = contacts.reduce(
      (max, { id }) => (Number(id) > max ? Number(id) : max),
      0
    );
    const newContact = {
      id: Number(maxId + 1),
      ...newContactData,
      favorite: false,
    };
    setContacts([...contacts, newContact]);
  };

  const handleToggleFavorite = (targetId) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === Number(targetId)
        ? { ...contact, favorite: !contact.favorite }
        : contact
    );
    setContacts(updatedContacts);
  };

  const handleDeleteContact = (targetId) => {
    const remainingContacts = contacts.filter(
      (contact) => contact.id !== Number(targetId)
    );
    setContacts(remainingContacts);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout loading={loading} error={error} />}>
        <Route index element={<Home contacts={contacts} />} />
        <Route
          path="contacts"
          element={
            <ContactList
              contacts={contacts}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDeleteContact}
            />
          }
        />
        <Route
          path="contacts/new"
          element={<AddContact onAdd={handleAddContact} />}
        />
        <Route
          path="contacts/:id"
          element={<ContactDetail contacts={contacts} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
