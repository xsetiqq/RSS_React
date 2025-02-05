import { useState } from 'react';
import './App.css';
import Topcontrols from './components/header/TopControls';
import Main from './components/main/Main';
import { fetchData } from './utils/api';
import ErrorComponent from './components/errorBoundary/ErrorComponent';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import { Planet } from './models/planet';

const App = () => {
  const [data, setData] = useState<Planet[] | undefined>([]);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);

  const getApiData = async (searchTerm: string) => {
    setisLoading(true);
    setisError(false);
    const result = await fetchData(searchTerm);
    setData(result.data);
    setisLoading(false);
    setisError(result.isError);
  };

  return (
    <ErrorBoundary>
      <Topcontrols getApiData={getApiData} />
      <Main data={data} isLoading={isLoading} isError={isError} />
      <ErrorComponent />
    </ErrorBoundary>
  );
};

export default App;
