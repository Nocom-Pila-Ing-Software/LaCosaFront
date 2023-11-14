import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chat from './Chat';

// Mock the api module
let mockSocket = {
        onmessage: jest.fn(),
        close: jest.fn(),
        send: jest.fn(),
    }

jest.mock('../../services.js', () => ({
    getWebsocket: (roomID) => mockSocket
}));

describe('Chat', () => {
    const props = {
        events: ['event 1', 'event 2'],
        localPlayerInfo: { playerFound: { username: 'test user' } },
        roomID: '1',
    };


    it('renders the chat and logs buttons', () => {
        render(<Chat {...props} />);
        expect(screen.getByText('Chat')).toBeInTheDocument();
        expect(screen.getByText('Logs')).toBeInTheDocument();
    });


    it('sends a message when the form is submitted', async () => {
        render(<Chat {...props} />);

        // Espera a que el WebSocket se establezca
        await waitFor(() => {
          expect(screen.getByRole('form')).toBeInTheDocument();
        });

        // Simula el cambio en el campo de entrada
        const input = screen.getByPlaceholderText('Escribe tu mensaje...');
        fireEvent.change(input, { target: { value: 'test message' } });

        // Simula la presentación del formulario
        fireEvent.submit(screen.getByRole('form'));

        expect(mockSocket.send).toHaveBeenCalledWith(JSON.stringify({
            type: 'message',
            msg: 'test message',
            username: 'test user',
          }));
      });

});

