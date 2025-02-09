import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Homepage';
import NotFound from './pages/NotFoundPage';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
