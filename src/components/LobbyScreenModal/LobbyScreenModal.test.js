import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils'
import LobbyScreenModal from './LobbyScreenModal';

// Mock the api module
jest.mock('../../services.js', () => ({
    getRoomInfo: jest.fn(() => Promise.resolve({
        "CountPlayers": 0,
        "Players": [
            { "playerName": "Capo" },
            { "playerName": "Mafia" }
        ],
        "hasStarted": true,
        "minPlayers": 0,
        "maxPlayers": 0,
        "host": {
            "id": 0,
            "name": "Capo"
        }
    }
    )
    ),
    removePlayerFromRoom: jest.fn(),
    createGame: jest.fn(),
}));

describe('LobbyScreenModal', () => {
    const onStartGameMock = jest.fn();
    const onLeaveMock = jest.fn();

    it('should render start game and leave room buttons for host', async () => {
        await act(async () => {
            render(
                <LobbyScreenModal
                    roomID="1234"
                    onStartGame={onStartGameMock}
                    onLeave={onLeaveMock}
                    localName="Capo"
                    idPlayer={0}
                />
            );
        });
        expect(screen.getByText('Iniciar partida')).toBeInTheDocument();
        expect(screen.getByText('Abandonar Sala')).toBeInTheDocument();
        await act(async () => {
            await waitFor(() => {
                expect(screen.getByText('Capo')).toBeInTheDocument();
                expect(screen.getByText('Mafia')).toBeInTheDocument();
            });
        });
    })
    it('should render waiting for host and leave room button for player', async () => {
        await act(async () => {
            render(
                <LobbyScreenModal
                    roomID="1234"
                    onStartGame={onStartGameMock}
                    onLeave={onLeaveMock}
                    localName="Mafia"
                    idPlayer={1}
                />
            );
        });
        expect(screen.getByText('Esperando al anfitrión')).toBeInTheDocument();
        expect(screen.getByText('Abandonar Sala')).toBeInTheDocument();
        await act(async () => {
            await waitFor(() => {
                expect(screen.getByText('Capo')).toBeInTheDocument();
                expect(screen.getByText('Mafia')).toBeInTheDocument();
            });
        });
    })
})
