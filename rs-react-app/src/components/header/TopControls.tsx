'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './TopControls.module.css';

interface TopControlsProps {
  getApiData: (params: { searchTerm: string; page: number }) => void;
}

const TopControls = ({ getApiData }: TopControlsProps) => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const storedQuery = localStorage.getItem('lastSearch') || '';
    setQuery(storedQuery);

    // При первом рендере — вызов запроса с текущими параметрами
    const currentPage = Number(searchParams.get('page')) || 1;
    if (storedQuery) {
      getApiData({ searchTerm: storedQuery, page: currentPage });
    }
  }, []);

  const handleSearch = () => {
    if (query.trim() === '') return;

    localStorage.setItem('lastSearch', query);

    // Обновляем URL — сбрасываем на первую страницу
    const params = new URLSearchParams(window.location.search);
    params.set('search', query);
    params.set('page', '1');

    router.push(`?${params.toString()}`);

    // Вызываем запрос с новой страницей = 1
    getApiData({ searchTerm: query, page: 1 });
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
