import React from 'react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorComponent from '../../src/components/errorBoundary/ErrorComponent';
import ErrorBoundary from '../../src/components/errorBoundary/ErrorBoundary';

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ErrorComponent', () => {
  test('renders a button initially', () => {
    render(<ErrorComponent />);
    expect(screen.getByText('Throw Error')).toBeInTheDocument();
  });

  test('throws an error when button is clicked', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    const button = screen.getByText('Throw Error');

    fireEvent.click(button);

    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
  });
});
