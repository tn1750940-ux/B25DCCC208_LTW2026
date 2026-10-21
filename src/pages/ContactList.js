import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import ContactTable from '../components/ContactTable';

const ContactList = ({ contacts = [], onToggleFavorite, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('Tất cả');

  const normalizedKeyword = searchTerm.trim().toLowerCase();

  const filteredContacts = contacts.filter(({ name, phone, group }) => {
    const matchesSearch =
      name.toLowerCase().includes(normalizedKeyword) ||
      phone.toLowerCase().includes(normalizedKeyword);
    const matchesGroup =
      selectedGroup === 'Tất cả' || group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  return (
    <div>
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedGroup={selectedGroup}
        onGroupChange={setSelectedGroup}
      />
      <p>{`Tìm thấy ${filteredContacts.length} liên hệ`}</p>
      <ContactTable
        contacts={filteredContacts}
        onToggleFavorite={onToggleFavorite}
        onDelete={onDelete}
      />
    </div>
  );
};

export default ContactList;
