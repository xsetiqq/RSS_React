import { ChangeEvent, useEffect, useState } from 'react';
import './TopControls.css';

interface TopControlsProps {
  getApiData: (newSearchTerm: string) => void;
  setPageStart: () => void;
}

const Topcontrols = ({ getApiData }: TopControlsProps) => {
  const lastQuery = localStorage.getItem('lastSearch') || '';
  const [query, setQuery] = useState(lastQuery);

  useEffect(() => {
    getApiData(lastQuery);
  }, [getApiData, lastQuery]);

  const handleSearch = (): void => {
    if (query.trim() === '') return;
    localStorage.setItem('lastSearch', query);
    getApiData(query);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  return (
    <div className="container">
      <h2>Top controls</h2>
      <div className="TopControls">
        <input
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="Search"
          className="search-input"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Topcontrols;
