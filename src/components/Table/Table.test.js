import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Table from './Table';

afterEach(cleanup);

test('it should render without crashing', () => {
  const { container } = render(<Table nOfPlayers={3} />);
  expect(container).toBeTruthy();
});

test('it should render Hand component', () => {
  const { getByText } = render(<Table nOfPlayers={3} />);
  const handComponent = getByText('Tu mano');
  expect(handComponent).toBeTruthy();
});
