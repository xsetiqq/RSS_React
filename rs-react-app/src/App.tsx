import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Home from './pages/Homepage';
import NotFound from './pages/NotFoundPage';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import { useEffect, useState } from 'react';

const App = () => {
  const [isLightTheme, setIsLightTheme] = useState(() => {
    return localStorage.getItem('theme') === 'light';
  });

  const toggleTheme = () => {
    setIsLightTheme((prev) => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'light' : 'dark');
      return newTheme;
    });
  };

  useEffect(() => {
    const werticalColmn = document.querySelector('.wertical-column');
    const buttons = document.querySelectorAll('button');

    if (isLightTheme) {
      document.body.classList.add('light');
      if (werticalColmn) werticalColmn.classList.add('light');
      buttons.forEach((btn) => btn.classList.add('light-button'));
    } else {
      document.body.classList.remove('light');
      if (werticalColmn) werticalColmn.classList.remove('light');
      buttons.forEach((btn) => btn.classList.remove('light-button'));
    }
  }, [isLightTheme]);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <button onClick={toggleTheme} className="theme-toggle">
            {isLightTheme ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
