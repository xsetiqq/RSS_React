import { useState, useEffect } from 'react';

const STORAGE_KEY = 'visitedCountries';

const useVisitedCountries = () => {
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setVisitedCountries(JSON.parse(stored));
    }
  }, []);

  const toggleVisited = (code: string) => {
    setVisitedCountries((prev) => {
      let updated: string[];
      if (prev.includes(code)) {
        updated = prev.filter((c) => c !== code);
      } else {
        updated = [...prev, code];
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { visitedCountries, toggleVisited };
};

export default useVisitedCountries;
