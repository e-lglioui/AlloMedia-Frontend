import React from 'react'; 
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Register from '../pages/register.jsx'; 

test('renders register form', () => {
  render(<Register />);

  expect(screen.getByPlaceholderText('-- Enter your name --')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('-- Enter Email address --')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('-- Enter your password --')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('-- Enter your phone number --')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('-- Enter your address --')).toBeInTheDocument();
  expect(screen.getByLabelText('Client')).toBeInTheDocument();
  expect(screen.getByLabelText('Livreur')).toBeInTheDocument();
});
