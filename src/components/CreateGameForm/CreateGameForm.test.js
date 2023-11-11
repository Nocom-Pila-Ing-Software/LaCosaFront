import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateGameForm from './CreateGameForm';
import * as api from '../../services.js';

describe("CreateGameForm", () => {
  test("renders form with correct fields", () => {
    render(<CreateGameForm onRoomCreated={() => {}}/>);

    expect(screen.getByText('LA COSA')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nombre del anfitrion')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nombre de la partida')).toBeInTheDocument();
    expect(screen.getByText('Crear partida')).toBeInTheDocument();
    });
  test("Opens modal when form is submitted with valid values", async () => {
    
    render(<CreateGameForm onRoomCreated={() => {}}/>);
    
    const hostNameInput = screen.getByPlaceholderText('Nombre del anfitrion');
    const roomNameInput = screen.getByPlaceholderText('Nombre de la partida');
    const submitButton = screen.getByText('Crear partida');
    
    fireEvent.change(hostNameInput, { target: { value: 'Player1' } });
    fireEvent.change(roomNameInput, { target: { value: 'Partidita' } });
    
    const mockPost = jest.spyOn(api, 'createRoom');
    mockPost.mockResolvedValueOnce({data: {roomID: 1} });
    
    fireEvent.click(submitButton);
    expect(mockPost).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.getByText('Iniciar partida')).toBeInTheDocument();
    });
  });

});