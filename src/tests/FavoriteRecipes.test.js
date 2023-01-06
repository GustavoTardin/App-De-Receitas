import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

describe('Verifica se na página de Favoritos', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.document.execCommand = jest.fn(() => true);
  });

  it('Existem os botões de categorias', () => {
    renderWithRouter(<FavoriteRecipes />);

    const allButton = screen.getByTestId('filter-by-all-btn');
    const mealsButton = screen.getByTestId('filter-by-meal-btn');
    const drinksButton = screen.getByTestId('filter-by-drink-btn');

    expect(allButton).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
    expect(drinksButton).toBeInTheDocument();
  });

  it('Verifica se existem 2 itens aparecendo na tela', async () => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    renderWithRouter(<FavoriteRecipes />);

    const firstItem = await screen.findByText(/spicy arrabiata penne/i);
    const secondItem = await screen.findByText(/aquamarine/i);

    expect(firstItem).toBeInTheDocument();
    expect(secondItem).toBeInTheDocument();
  });

  it('Verifica se os botões de categoria funcionam', async () => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    renderWithRouter(<FavoriteRecipes />);

    const firstItem = await screen.findByText(/spicy arrabiata penne/i);
    const secondItem = await screen.findByText(/aquamarine/i);
    const allButton = screen.getByTestId('filter-by-all-btn');
    const mealsButton = screen.getByTestId('filter-by-meal-btn');
    const drinksButton = screen.getByTestId('filter-by-drink-btn');

    expect(allButton).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
    expect(drinksButton).toBeInTheDocument();
    expect(firstItem).toBeInTheDocument();
    expect(secondItem).toBeInTheDocument();

    userEvent.click(mealsButton);
    expect(secondItem).not.toBeInTheDocument();

    userEvent.click(drinksButton);
    expect(firstItem).not.toBeInTheDocument();

    userEvent.click(drinksButton);

    const firstItem2 = await screen.findByText(/spicy arrabiata penne/i);
    const secondItem2 = await screen.findByText(/aquamarine/i);

    expect(firstItem2).toBeInTheDocument();
    expect(secondItem2).toBeInTheDocument();
  });

  it('Verifica se os botões de categoria funcionam', async () => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    renderWithRouter(<FavoriteRecipes />);

    const firstItemButtonShare = await screen.findByTestId('0-horizontal-share-btn');
    expect(firstItemButtonShare).toBeInTheDocument();

    userEvent.click(firstItemButtonShare);

    const linkcopied = await screen.findAllByText('Link copied!');
    expect(linkcopied[0]).toBeInTheDocument();
  });
});
