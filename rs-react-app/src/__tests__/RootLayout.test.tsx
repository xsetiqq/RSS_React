import { render, screen } from '@testing-library/react';
import RootLayout from '../../app/layout';

describe('RootLayout Component', () => {
  it('renders children correctly', () => {
    render(
      <RootLayout>
        <div data-testid="child-component">Hello, Test!</div>
      </RootLayout>
    );

    expect(screen.getByTestId('child-component')).toBeInTheDocument();
    expect(screen.getByText('Hello, Test!')).toBeInTheDocument();
  });
});
