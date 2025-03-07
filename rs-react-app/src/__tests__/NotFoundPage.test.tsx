import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '../../app/not-found';

describe('NotFoundPage Component', () => {
  test('renders error message and 404 text', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('Oops! Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText('Error 404')).toBeInTheDocument();
  });

  test('renders error image', () => {
    render(<NotFoundPage />);

    const errorImage = screen.getByAltText('Error Alert');
    expect(errorImage).toBeInTheDocument();
    expect(errorImage).toHaveAttribute('src', '/assets/alert.png');
  });

  test('renders home link', () => {
    render(<NotFoundPage />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
