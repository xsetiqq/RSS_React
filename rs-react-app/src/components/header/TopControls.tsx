'use client';
import { useState, useEffect } from 'react';
import styles from './TopControls.module.css';

interface TopControlsProps {
  getApiData: (newSearchTerm: string) => void;
}

const TopControls = ({ getApiData }: TopControlsProps) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastSearch') || '';
    setQuery(lastQuery);
    getApiData(lastQuery);
  }, [getApiData]);

  const handleSearch = () => {
    if (query.trim() === '') return;

    localStorage.setItem('lastSearch', query);
    const params = new URLSearchParams(window.location.search);
    params.set('search', query);
    params.set('page', '1'); // ✅ Сбрасываем на первую страницу
    params.delete('details'); // ✅ Удаляем `details`

    window.history.pushState({}, '', `?${params.toString()}`);
    getApiData(query); // ✅ Обновляем API-запрос
    window.dispatchEvent(new PopStateEvent('popstate')); // ✅ Принудительный ререндер
  };

  return (
    <div className={styles.container}>
      <h2>Top Controls</h2>
      <div className={styles.topControls}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className={styles.searchInput}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default TopControls;
