import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';

const ProblematicComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  test('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <p>Content is here</p>
      </ErrorBoundary>
    );
    expect(screen.getByText('Content is here')).toBeInTheDocument();
  });

  test('renders fallback UI when an error occurs', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    vi.restoreAllMocks();
  });
});
