import { test, expect, vi } from 'vitest';
import { createRoot } from 'react-dom/client';

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

test('main.tsx монтируется без ошибок', async () => {
  document.body.innerHTML = '<div id="root"></div>';
  await import('../main');

  expect(createRoot).toHaveBeenCalled();
});
