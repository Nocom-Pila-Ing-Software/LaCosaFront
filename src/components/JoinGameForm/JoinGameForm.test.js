import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import JoinGameForm from './JoinGameForm';
import Modal from './JoinGameFormModal';
import * as api from '../../services.js';



describe("JoinGameForm", () => {
  test("renders form with correct fields", () => {
    render(<JoinGameForm onStartGame={() => {}}/>);

    expect(screen.getByPlaceholderText('Nombre del jugador')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ID de la partida')).toBeInTheDocument();
    expect(screen.getByText('Unirse')).toBeInTheDocument();
  });
  test("opens modal when form is submitted with valid values", async () => {

    render(<JoinGameForm onStartGame={() => {}}/>);

    const playerNameInput = screen.getByPlaceholderText('Nombre del jugador');
    const roomIDInput = screen.getByPlaceholderText('ID de la partida');
    const submitButton = screen.getByText('Unirse');

    fireEvent.change(playerNameInput, { target: { value: 'Player1' } });
    fireEvent.change(roomIDInput, { target: { value: '123' } });

    const mockPost = jest.spyOn(api, 'addPlayerToWaitingRoom');
    mockPost.mockResolvedValueOnce({ok: true });

    fireEvent.click(submitButton);
    expect(mockPost).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      render(<Modal />);
      expect(screen.getByText('Esperando a que el anfitrion inicie la partida')).toBeInTheDocument();
    });
      
  });
  
});