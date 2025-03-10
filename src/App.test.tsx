import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/discover your sound/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders subheading', () => {
  render(<App />);
  const subheadingElement = screen.getByText(/premium audio equipment/i);
  expect(subheadingElement).toBeInTheDocument();
});
