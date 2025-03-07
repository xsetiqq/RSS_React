import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  hydrateRoot(rootElement, <App />);
} else {
  console.error('Элемент #root не найден в HTML!');
}
