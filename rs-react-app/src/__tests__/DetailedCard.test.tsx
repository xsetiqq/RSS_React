import { render, screen, fireEvent } from '@testing-library/react';
import RightSectionPage from '../pages/RightSectionPage';

test('показывает индикатор загрузки', () => {
  render(<RightSectionPage isLoading={true} />);
  expect(screen.getByText('Загрузка...')).toBeInTheDocument();
});

test('отображает детальную информацию', () => {
  const detailData = { name: 'Detailed Card', gender: 'Male' };
  render(<RightSectionPage isLoading={false} detailData={detailData} />);
  expect(screen.getByText('Detailed Card')).toBeInTheDocument();
});

test('кнопка закрытия скрывает компонент', () => {
  const mockClose = jest.fn();
  render(
    <RightSectionPage
      isLoading={false}
      detailData={{ name: 'Test' }}
      closeDetails={mockClose}
    />
  );
  fireEvent.click(screen.getByText('Закрыть'));
  expect(mockClose).toHaveBeenCalled();
});
