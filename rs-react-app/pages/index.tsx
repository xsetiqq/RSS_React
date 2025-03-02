'use client';
import TopControls from '../src/components/header/TopControls';
import Main from '../src/components/main/Main';
import ErrorComponent from '../src/components/errorBoundary/ErrorComponent';
import Pagination from '../src/components/main/Pagination';
import { useGetPeopleQuery } from '../src/store/apiSlice';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

const Home: React.FC = () => {
  const searchParams = useSearchParams(); // ✅ Убрали `setSearchParams()`
  const searchTerm = searchParams?.get('search') || '';
  const pageParam = searchParams?.get('page');
  const initialPage = pageParam ? Number(pageParam) : 1;

  const [currentPage, setCurrentPage] = useState(initialPage);

  const { data, isLoading, isFetching, isError } = useGetPeopleQuery({
    searchTerm,
    page: currentPage,
  });

  const countPersons = data?.countPersons || 0;

  const updateSearchParams = (newSearchTerm: string, newPage: number) => {
    const newParams = new URLSearchParams();
    if (newSearchTerm) newParams.set('search', newSearchTerm);
    newParams.set('page', String(newPage));
    window.history.pushState({}, '', `?${newParams.toString()}`);
  };

  const handleSearch = (newSearchTerm: string) => {
    if (newSearchTerm !== searchTerm) {
      updateSearchParams(newSearchTerm, 1);
      setCurrentPage(1);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage) {
      updateSearchParams(searchTerm, newPage);
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <TopControls
        getApiData={handleSearch}
        setPageStart={() => handlePageChange(1)}
      />
      {isLoading || isFetching ? (
        <img src="/assets/ring-resize.svg" alt="loading..." />
      ) : (
        <Main
          data={data?.data}
          isLoading={isLoading}
          isError={isError}
          countPersons={countPersons}
        />
      )}

      <Pagination
        countPersons={countPersons}
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
      />
      <ErrorComponent />
    </>
  );
};

export default Home;
