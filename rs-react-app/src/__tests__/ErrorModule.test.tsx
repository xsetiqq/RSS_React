import { render, screen } from '@testing-library/react';
import ErrorModule from '../components/error/ErrorModule';

describe('ErrorModule', () => {
  test('renders error message', () => {
    render(<ErrorModule />);
    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
  });
});
