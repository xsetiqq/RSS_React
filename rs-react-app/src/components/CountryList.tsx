import { useState, useMemo, useCallback, useEffect } from 'react';
import { useGetAllCountriesQuery } from '../api/countriesApi';
import useVisitedCountries from '../hooks/useVisitedCountries';
import CountryCard from './CountryCard';
import SearchAndFilter from './SearchAndFilter';
import Pagination from './Pagination';

const CountryList = () => {
  const { data: countries, isLoading, error } = useGetAllCountriesQuery();
  const { visitedCountries, toggleVisited } = useVisitedCountries();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [sortField, setSortField] = useState<'name' | 'population'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedRegion, sortField, sortOrder]);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleRegionChange = useCallback((region: string) => {
    setSelectedRegion(region);
  }, []);

  const handleSortChange = useCallback(
    (field: 'name' | 'population', order: 'asc' | 'desc') => {
      setSortField(field);
      setSortOrder(order);
    },
    []
  );

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const filteredCountries = useMemo(() => {
    if (!countries) return [];

    let result = [...countries];

    if (selectedRegion !== 'All') {
      result = result.filter((c) => c.region === selectedRegion);
    }

    if (searchTerm.trim() !== '') {
      result = result.filter((c) =>
        c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    result.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'name') {
        comparison = a.name.common.localeCompare(b.name.common);
      } else {
        comparison = a.population - b.population;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [countries, searchTerm, selectedRegion, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  const paginatedCountries = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCountries.slice(startIndex, endIndex);
  }, [filteredCountries, currentPage]);

  if (isLoading) return <p>Loading countries...</p>;
  if (error) return <h4>Failed to load countries ❌</h4>;

  return (
    <div>
      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        selectedRegion={selectedRegion}
        onRegionChange={handleRegionChange}
        sortField={sortField}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />
      {filteredCountries.length === 0 ? (
        <p
          style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.1rem' }}
        >
          No countries found matching your criteria.
        </p>
      ) : (
        <>
          {paginatedCountries.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              visited={visitedCountries.includes(country.cca3)}
              toggleVisited={toggleVisited}
            />
          ))}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        </>
      )}
    </div>
  );
};

export default CountryList;
