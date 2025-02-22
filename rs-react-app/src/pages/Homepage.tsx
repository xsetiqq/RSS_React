import TopControls from '../components/header/TopControls';
import Main from '../components/main/Main';
import ErrorComponent from '../components/errorBoundary/ErrorComponent';
import Pagination from '../components/main/Pagination';
import { useSearchParams } from 'react-router-dom';
import { useGetPeopleQuery } from '../store/apiSlice';
import { useState } from 'react';
import './Homepage.css';

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Получаем параметры из URL
  const searchTerm = searchParams.get('search') || '';
  const pageParam = searchParams.get('page');
  const initialPage = pageParam ? Number(pageParam) : 1;

  const [currentPage, setCurrentPage] = useState(initialPage);

  // Запрос списка персонажей через RTK Query
  const { data, isLoading, isFetching, isError } = useGetPeopleQuery({
    searchTerm,
    page: currentPage,
  });

  const countPersons = data?.countPersons || 0;

  // Функция поиска (сбрасывает страницу на 1)
  const handleSearch = (newSearchTerm: string) => {
    if (newSearchTerm !== searchTerm) {
      setSearchParams({ search: newSearchTerm, page: '1' });
      setCurrentPage(1);
    }
  };

  // Функция переключения страниц
  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      setSearchParams({ search: searchTerm, page: String(newPage) });
    }
  };

  return (
    <>
      <TopControls
        getApiData={handleSearch}
        setPageStart={() => handlePageChange(1)}
      />

      {/* Показываем спиннер, если данные загружаются */}
      {isLoading || isFetching ? (
        <img src=".\src\assets\ring-resize.svg" alt="loading..." />
      ) : (
        <Main
          data={data?.data} // Персонажи
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
