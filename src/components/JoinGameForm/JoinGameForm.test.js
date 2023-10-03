import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import JoinGameForm from './JoinGameForm';

describe("JoinGameForm", () => {
    test("renders form with correct fields", () => {
        render(<JoinGameForm />);

        expect(screen.getByPlaceholderText('Nombre del jugador')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Nombre de la partida')).toBeInTheDocument();
        expect(screen.getByText('Unirse')).toBeInTheDocument();
    });
});
