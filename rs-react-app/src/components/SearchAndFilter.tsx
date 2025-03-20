// src/components/SearchAndFilter.tsx
import React from 'react';
import styles from './SearchAndFilter.module.css';

interface Props {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onSortChange: (field: 'name' | 'population', order: 'asc' | 'desc') => void;
}

const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

const SearchAndFilter: React.FC<Props> = ({
  searchTerm,
  onSearchChange,
  selectedRegion,
  onRegionChange,
  sortField,
  sortOrder,
  onSortChange,
}) => {
  return (
    <div className={styles.filterPanel}>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.input}
      />

      <select
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
        className={styles.select}
      >
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      <select
        value={sortField}
        onChange={(e) =>
          onSortChange(e.target.value as 'name' | 'population', sortOrder)
        }
        className={styles.select}
      >
        <option value="name">Sort by Name</option>
        <option value="population">Sort by Population</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) =>
          onSortChange(sortField, e.target.value as 'asc' | 'desc')
        }
        className={styles.select}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default React.memo(SearchAndFilter);
