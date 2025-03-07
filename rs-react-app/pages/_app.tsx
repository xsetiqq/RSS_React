import '../styles/index.css';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import ErrorBoundary from '../src/components/errorBoundary/ErrorBoundary';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </Provider>
  );
}
