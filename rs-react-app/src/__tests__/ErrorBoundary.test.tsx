import React from 'react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../../src/components/errorBoundary/ErrorBoundary';

// ✅ Компонент, который вызывает ошибку
const ThrowError = () => {
  throw new Error('Test error');
};

// ✅ Мокаем `console.error`, чтобы не засорять логи
beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ErrorBoundary component', () => {
  test('renders children without errors', () => {
    render(
      <ErrorBoundary>
        <div>Safe Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Safe Content')).toBeInTheDocument();
  });

  test('renders ErrorModule when child throws an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    // ✅ Теперь проверяем реальный текст ошибки
    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
  });

  test('calls console.error when an error is caught', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(console.error).toHaveBeenCalled();
  });
});
