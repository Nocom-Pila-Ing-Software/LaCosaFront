import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils'
import JoinGameForm from './JoinGameForm';
import Modal from './JoinGameFormModal';
import * as api from '../../services.js';

jest.mock('../../services.js', () => ({
  getWaitingRooms: jest.fn(() => Promise.resolve({
      rooms: [
          {
              id: 1,
              name: 'Room1',
              playerAmount: 3,
              minPlayers: 4,
              maxPlayers: 5
          }
      ]
  })),
  getRoomInfo: jest.fn(() => Promise.resolve({
    "CountPlayers": 0,
        "Players": [
            { "playerName": "Capo" },
            { "playerName": "Mafia" },
            { "playerName": "xPeke"  }
        ],
        "hasStarted": false,
        "minPlayers": 4,
        "maxPlayers": 5,
        "host": {
            "id": 1,
            "name": "Capo"
        }
  })),
  addPlayerToWaitingRoom: jest.fn(() => Promise.resolve({
    "playerID": 4
  })),
}));

describe("JoinGameForm", () => {
  test("renders form with correct fields", () => {
    render(<JoinGameForm onRoomCreated={() => {}}/>);

    expect(screen.getByPlaceholderText('Nombre del jugador')).toBeInTheDocument();
    expect(screen.getByText('Ver Listas De partidas')).toBeInTheDocument();
  });
  test('Modal component fetches and displays list of rooms', async () => {
    await act(async () => {
      render(<JoinGameForm onRoomCreated={() => {}} />);
    });
    expect(screen.getByPlaceholderText('Nombre del jugador')).toBeInTheDocument();
    expect(screen.getByText('Ver Listas De partidas')).toBeInTheDocument();


    // Para la prueba del modal
    jest.useFakeTimers();
    await act(async () => {
        render(
            <Modal
                playerName="Player1"
                closeModal={() => {}}
                onRoomCreated={() => {}}
            />
        );
        jest.advanceTimersByTime(3000); // Avanza el temporizador para simular el intervalo de actualización de la API
    });

    expect(screen.getByText('Lista de partidas')).toBeInTheDocument();
    expect(screen.getByText('Room1')).toBeInTheDocument();
    expect(screen.getByText('Unirse')).toBeInTheDocument();
  
  });
  test('should join a room when the "Unirse" button is clicked', async () => {
    const onRoomCreatedMock = jest.fn();
    await act(async () => {
      render(<Modal playerName="Player1" closeModal={() => {}} onRoomCreated={onRoomCreatedMock} />);
    });

    // Simular el clic en el botón de unirse con un ID de sala simulado
    const roomID = 1;
    await act(async () => {
      fireEvent.click(screen.getByText('Unirse'));
    });

    // Verificar si la función simulada de addPlayerToWaitingRoom se llamó con los argumentos correctos
    expect(api.addPlayerToWaitingRoom).toHaveBeenCalledWith(roomID, { playerName: 'Player1' });

    // Verificar si la función onRoomCreated se llamó con los argumentos correctos después de unirse
    expect(onRoomCreatedMock).toHaveBeenCalledWith(roomID, 'Player1', expect.anything());
  });
});
