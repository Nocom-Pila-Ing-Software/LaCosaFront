import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateGameForm from './CreateGameForm.jsx';


// Test to check if the form is rendered correctly
test('form renders with correct fields', () => {
  const { getByPlaceholderText } = render(<CreateGameForm onStartGame={() => {}}/>);

  const hostNameInput = getByPlaceholderText('Nombre del jugador');
  const roomNameInput = getByPlaceholderText('Nombre de la partida');

  expect(hostNameInput).toBeInTheDocument();
  expect(roomNameInput).toBeInTheDocument();
});

