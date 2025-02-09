import Topcontrols from '../components/header/TopControls';
import Main from '../components/main/Main';
import ErrorComponent from '../components/errorBoundary/ErrorComponent';
import { Person } from '../models/person';
import './App.css';
import Pagination from '../components/main/Pagination';
import { useCallback, useState } from 'react';
import { fetchData } from '../utils/api';
import { useSearchParams } from 'react-router-dom';

const Home: React.FC = () => {
  const [data, setData] = useState<Person[] | undefined>([]);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [countPersons, setCountPersons] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setSearchParams] = useSearchParams();

  const getApiData = useCallback(
    async (searchTerm: string, isResetPage?: boolean) => {
      const firstPage = 1;
      const page = isResetPage ? firstPage : currentPage;

      if (isResetPage) {
        setPageStart();
      }

      setisLoading(true);
      setisError(false);
      const result = await fetchData(searchTerm, page);
      console.log(result);
      setCountPersons(result.countPersons);
      setSearchParams({ search: searchTerm, page: String(currentPage) });
      setData(result.data);
      setisLoading(false);
      setisError(result.isError);
    },
    [currentPage]
  );

  const setPageStart = () => {
    setCurrentPage(1);
  };

  return (
    <>
      <Topcontrols getApiData={getApiData} setPageStart={setPageStart} />
      <Main
        data={data}
        isLoading={isLoading}
        isError={isError}
        countPersons={countPersons}
      />
      <Pagination
        countPersons={countPersons}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ErrorComponent />
    </>
  );
};

export default Home;
