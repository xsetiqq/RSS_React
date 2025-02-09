import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Homepage';
import NotFound from './pages/NotFoundPage';
import RightSection from './pages/RightSectionPage';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/details/*" element={<RightSection />}></Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
