'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './TopControls.module.css';

interface TopControlsProps {
  getApiData: (query: string) => void;
}

const TopControls = ({ getApiData }: TopControlsProps) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lastQuery = localStorage.getItem('lastSearch') || '';
      setQuery(lastQuery);
      getApiData(lastQuery);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lastSearch', newQuery);
    }
  };

  const handleSearch = () => {
    if (query.trim() === '') return;

    if (typeof window !== 'undefined') {
      localStorage.setItem('lastSearch', query);
    }

    const params = new URLSearchParams(window.location.search);
    params.set('search', query);
    params.set('page', '1');

    router.push(`?${params.toString()}`);
  };

  return (
    <div className={styles.container}>
      <h2>Top Controls</h2>
      <div className={styles.topControls}>
        <input
          type="search"
          value={query}
          onChange={handleInputChange}
          placeholder="Search"
          className={styles.searchInput}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default TopControls;
