import { test, expect, vi } from 'vitest';
import { createRoot } from 'react-dom/client';

// Мокаем createRoot
vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

test('main.tsx монтируется без ошибок', async () => {
  document.body.innerHTML = '<div id="root"></div>'; // Добавляем root
  await import('../main'); // Импортируем main.tsx

  expect(createRoot).toHaveBeenCalled(); // Проверяем вызов createRoot
});
