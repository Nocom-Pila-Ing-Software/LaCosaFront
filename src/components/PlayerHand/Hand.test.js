import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hand from './Hand';

describe('Hand component', () => {
	const props = {
		name: 'Test Player',
		localPlayerInfo: {
			playerFound: { username: 'testplayer', playerID: 1 },
			playerInfo: { hand: [{ cardID: 1, name: 'Test Card', description: 'This is a test card' }], role: 'human' },
		},
		allGameData: {
			playerPlayingTurn: { playerID: 1 },
			lastPlayedCard: { cardID: 0 },
			deadPlayers: [],
			currentAction: 'action',
			gameID: 1,
		},
	};

	it('renders the player name and role', () => {
		render(<Hand {...props} />);
		expect(screen.getByText('Test Player eres Humano')).toBeInTheDocument();
	});

	/*it('renders the player hand', async () => {
		const onCardClick = jest.fn();
    const targetPlayers = [{ playerID: 2, playerName: 'Test Player 2' }];
    render(<Hand {...props} targetPlayers={targetPlayers} onCardClick={onCardClick} />);
    const card = await screen.findByTestId('card');
    expect(card).toBeInTheDocument();
    fireEvent.click(card);
		expect(onCardClick).toHaveBeenCalledTimes(1);
    });*/

	it('displays a message when the player is dead', () => {
		const deadPlayerProps = {
			...props,
			allGameData: { ...props.allGameData, deadPlayers: [{ username: 'testplayer' }] },
		};
		render(<Hand {...deadPlayerProps} />);
		expect(screen.getByText('Estas muerto!')).toBeInTheDocument();
	});

	it('displays a message when it is not the player turn', async () => {
    const notPlayerTurnProps = {
        ...props,
        allGameData: {
            ...props.allGameData,
            playerPlayingTurn: { playerID: 2 }
        },
        localPlayerInfo: {
            ...props.localPlayerInfo,
            playerInfo: {
                ...props.localPlayerInfo.playerInfo,
                playerID: 1
            }
        }
    };
    render(<Hand {...notPlayerTurnProps} />);
    const messageElement = await screen.findByText('Espera a que sea tu turno para poder jugar');
    expect(messageElement).toBeInTheDocument();
});

	it('displays a button to play a card when it is the player turn and there is a card to play', () => {
		const playableCardProps = {
			...props,
			allGameData: { ...props.allGameData, currentAction: 'action' },
		};
		render(<Hand {...playableCardProps} />);
		expect(screen.getByText('Jugar Carta')).toBeInTheDocument();
	});

	it('displays a button to discard a card when it is the player turn', () => {
		render(<Hand {...props} />);
		expect(screen.getByText('Descartar Carta')).toBeInTheDocument();
	});

	it('displays a button to draw a card when it is the player turn and the current action is "draw"', () => {
		const drawActionProps = {
			...props,
			allGameData: { ...props.allGameData, currentAction: 'draw' },
		};
		render(<Hand {...drawActionProps} />);
		expect(screen.getByText('Robar Carta')).toBeInTheDocument();
	});

	it('displays a button to trade a card when it is the player turn and the current action is "trade"', () => {
		const tradeActionProps = {
			...props,
			allGameData: { ...props.allGameData, currentAction: 'trade' },
		};
		render(<Hand {...tradeActionProps} />);
		expect(screen.getByText('Intercambiar carta')).toBeInTheDocument();
	});

	it('displays a button to defend when it is the player turn and there is a card to defend', () => {
		const defendableCardProps = {
			...props,
			allGameData: { ...props.allGameData, currentAction: 'defense', lastPlayedCard: { cardID: 2 } },
			localPlayerInfo: {
				...props.localPlayerInfo,
				playerInfo: { ...props.localPlayerInfo.playerInfo, hand: [{ cardID: 2, name: 'Defend Card', description: 'This is a defend card' }] },
			},
		};
		render(<Hand {...defendableCardProps} />);
		expect(screen.getByText('Defensa')).toBeInTheDocument();
	});

	it('displays a button to omit defense when it is the player turn and there is no card to defend', () => {
		const noDefendableCardProps = {
			...props,
			allGameData: { ...props.allGameData, currentAction: 'defense', lastPlayedCard: { cardID: 2 } },
		};
		render(<Hand {...noDefendableCardProps} />);
		expect(screen.getByText('Omitir defensa')).toBeInTheDocument();
	});

	it('calls the handleCardClick function when a card is clicked', () => {
		const handleCardClick = jest.fn();
		render(<Hand {...props} handleCardClick={handleCardClick} />);
		fireEvent.click(screen.getByText('Test Card'));
		expect(handleCardClick).toHaveBeenCalledWith(1);
	});
});
