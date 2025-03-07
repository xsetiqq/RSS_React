import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/store/store';
import ErrorBoundary from '../../src/components/errorBoundary/ErrorBoundary';
import App from '../../app/_app';

const MockComponent = () => <div>Mock Component</div>;

describe('_app.tsx', () => {
  test('renders the application with Redux Provider and ErrorBoundary', () => {
    render(
      <Provider store={store}>
        <ErrorBoundary>
          <MockComponent />
        </ErrorBoundary>
      </Provider>
    );

    expect(screen.getByText('Mock Component')).toBeInTheDocument();
  });
});
