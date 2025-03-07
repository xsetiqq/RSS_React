import ClientProvider from '../../app/ClientProvider';
import { render, screen } from '@testing-library/react';

describe('ClientProvider Component', () => {
  it('renders children correctly', () => {
    render(
      <ClientProvider>
        <div data-testid="child-component">Hello, Test!</div>
      </ClientProvider>
    );

    expect(screen.getByTestId('child-component')).toBeInTheDocument();
    expect(screen.getByText('Hello, Test!')).toBeInTheDocument();
  });
});
