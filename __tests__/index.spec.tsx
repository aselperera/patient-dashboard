import React from 'react';
import { render, screen } from '@testing-library/react'

import Index from '../pages/index';

test('renders title', () => {
  render(<Index />);
  const headerElement = screen.getByText(/Patients/);
  expect(headerElement).toBeInTheDocument();
});
