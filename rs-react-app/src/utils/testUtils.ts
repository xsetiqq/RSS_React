import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';

export function setupApiStore(api) {
  const store = configureStore({
    reducer: { [api.reducerPath]: api.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

  function Wrapper({ children }) {
    return React.createElement(Provider, { store }, children);
  }

  return {
    store,
    renderHook: (hook) => renderHook(hook, { wrapper: Wrapper }),
  };
}
