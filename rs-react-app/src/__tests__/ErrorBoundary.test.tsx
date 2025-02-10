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
    vi.spyOn(console, 'error').mockImplementation(() => {}); // Отключаем ошибки в консоли

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    // Проверяем наличие fallback UI с частичным текстом
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    vi.restoreAllMocks(); // Восстанавливаем консоль после теста
  });
});
