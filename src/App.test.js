import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Render the Router', () => {
  render(<App />);
  expect(true).toBe(true);
});
