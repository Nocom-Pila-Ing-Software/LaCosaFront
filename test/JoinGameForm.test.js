import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import JoinGameForm from './JoinGameForm';

describe ('JoinGameForm' , () =>{
  it('renders correctly', () => {
    render(<JoinGameForm />);
    expect(screen.getByText('Unirse a una partida')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nombre del jugador')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nombre de la partida')).toBeInTheDocument();
    expect(screen.getByText('Unirse')).toBeInTheDocument();
    });
  it('disables the "Unirse" button when modal is open', () =>{
    render(<JoinGameForm />);
    const playerNameInput = screen.getByPlaceholderText('Nombre del jugador');
    const roomNameInput = screen.getByPlaceholderText('Nombre de la partida');
    const joinGameButton = screen.getByText('Unirse');

    fireEvent.change(playerNameInput, {target: {value: 'Jugador 1'}});
    fireEvent.change(roomNameInput, {target: {value: 'Partida 1'}});

    fireEvent.click(joinGameButton);
    expect(joinGameButton).toBeDisabled();
  });
  it('opens the modal when "Unirse" is clicked', () =>{
    render(<JoinGameForm />);
    const playerNameInput = screen.getByPlaceholderText('Nombre del jugador');
    const roomNameInput = screen.getByPlaceholderText('Nombre de la partida');
    const joinGameButton = screen.getByText('Unirse');

    fireEvent.change(playerNameInput, {target: {value: 'Jugador 1'}});
    fireEvent.change(roomNameInput, {target: {value: 'Partida 1'}});

    fireEvent.click(joinGameButton);
    expect(screen.getByText('Esperando a que el anfitrion inicie la partida')).toBeInTheDocument();
    expect(screen.getByText('Quieres salir?')).toBeInTheDocument();
    expect(screen.getByText('Salir')).toBeInTheDocument();
  });
  it('closes the modal when "Salir" is clicked', () =>{
    render(<JoinGameForm />);
    const playerNameInput = screen.getByPlaceholderText('Nombre del jugador');
    const roomNameInput = screen.getByPlaceholderText('Nombre de la partida');
    const joinGameButton = screen.getByText('Unirse');

    fireEvent.change(playerNameInput, {target: {value: 'Jugador 1'}});
    fireEvent.change(roomNameInput, {target: {value: 'Partida 1'}});

    fireEvent.click(joinGameButton);
    fireEvent.click(screen.getByText('Salir'));
    expect(screen.queryByText('Esperando a que el anfitrion inicie la partida')).not.toBeInTheDocument();
    expect(screen.queryByText('Quieres salir?')).not.toBeInTheDocument();
    expect(screen.queryByText('Salir')).not.toBeInTheDocument();
  });
  it('enables the "Unirse" button when modal is closed' , () =>{
    render(<JoinGameForm />);
    const playerNameInput = screen.getByPlaceholderText('Nombre del jugador');
    const roomNameInput = screen.getByPlaceholderText('Nombre de la partida');
    const joinGameButton = screen.getByText('Unirse');

    fireEvent.change(playerNameInput, {target: {value: 'Jugador 1'}});
    fireEvent.change(roomNameInput, {target: {value: 'Partida 1'}});
    
    fireEvent.click(joinGameButton);
    fireEvent.click(screen.getByText('Salir'));
    expect(joinGameButton).not.toBeDisabled();
  });
});