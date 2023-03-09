import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MockComponent from './MockComponent';

describe('<MockComponent />', () => {
  test('it should mount', () => {
    render(<MockComponent />);
    
    const mockComponent = screen.getByTestId('MockComponent');

    expect(mockComponent).toBeInTheDocument();
  });
});