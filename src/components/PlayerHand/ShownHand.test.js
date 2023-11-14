import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ShownHand from './ShownHand';

describe('ShownHand', () => {
    const shownCards = [
        { cardID: 1, name: 'Lanzallamas' },
        { cardID: 2, name: 'Seduccion' },
        { cardID: 3, name: 'Analisis' },
        { cardID: 4, name: 'Vigila tus espaldas' },
    ];
    const closeModal = jest.fn();

    it('renders the correct number of cards', () => {
        render(<ShownHand shownCards={shownCards} closeModal={closeModal} />);
        const cardRows = screen.getAllByTestId('card-row');
        expect(cardRows).toHaveLength(shownCards.length);
    });

    it('calls the closeModal function when the button is clicked', () => {
        render(<ShownHand shownCards={shownCards} closeModal={closeModal} />);
        fireEvent.click(screen.getByText('Creo que vi suficiente...'));
        expect(closeModal).toHaveBeenCalled();
    });
});
