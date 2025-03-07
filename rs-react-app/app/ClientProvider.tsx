'use client';

import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import ErrorBoundary from '../src/components/errorBoundary/ErrorBoundary';
import { ReactNode } from 'react';

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Provider>
  );
}
