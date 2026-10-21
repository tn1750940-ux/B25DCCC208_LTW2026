import React from 'react';
import { GROUPS } from '../data';

const FilterBar = ({ searchTerm, onSearchChange, selectedGroup, onGroupChange }) => {
  return (
    <div className="filter-bar">
      <div>
        <label htmlFor="search-input">Tìm kiếm</label>
        <input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="group-select">Nhóm</label>
        <select
          id="group-select"
          value={selectedGroup}
          onChange={(e) => onGroupChange(e.target.value)}
        >
          <option value="Tất cả">Tất cả</option>
          {GROUPS.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
