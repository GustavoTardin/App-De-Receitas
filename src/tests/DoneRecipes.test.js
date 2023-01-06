import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';
import mockDoneRecipe from '../mocks/mockDoneRecipes';

describe('testa a pagina DoneRecipes', () => {
  test('testa se os elementos renderizam na tela', async () => {
    window.localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipe));

    const { history } = renderWithRouter(<DoneRecipes />, { initialEntries: ['/done-recipes'] });
    expect(history.location.pathname).toBe('/done-recipes');

    window.document.execCommand = jest.fn(() => true);

    const title = screen.getByRole('heading', {
      name: /done recipes/i,
    });
    const profile = screen.getByRole('img', {
      name: /profileicon/i,
    });
    const btnAll = screen.getByRole('button', {
      name: /all/i,
    });
    const btnMeal = screen.getByRole('button', {
      name: /meals/i,
    });
    const btnDrink = screen.getByTestId('filter-by-drink-btn');
    const categoryMeal = screen.getByText(/italian - vegetarian/i);
    const nameMeal = screen.getByRole('link', {
      name: /spicy arrabiata penne/i,
    });
    const pasta = screen.getByText(/pasta/i);
    const curry = screen.getByText(/curry/i);
    const btnShareMeal = screen.getByTestId('0-horizontal-share-btn');
    const btnShareDrink = screen.getByTestId('1-horizontal-share-btn');
    const imageMeal = screen.getByTestId('0-horizontal-image');
    const imageDrink = screen.getByTestId('1-horizontal-image');

    expect(title).toBeInTheDocument();
    expect(profile).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
    expect(btnMeal).toBeInTheDocument();
    expect(btnDrink).toBeInTheDocument();
    expect(categoryMeal).toBeInTheDocument();
    expect(nameMeal).toBeInTheDocument();
    expect(pasta).toBeInTheDocument();
    expect(curry).toBeInTheDocument();
    expect(btnShareMeal).toBeInTheDocument();
    expect(btnShareDrink).toBeInTheDocument();
    expect(imageMeal).toBeInTheDocument();
    expect(imageDrink).toBeInTheDocument();

    userEvent.click(btnAll);
    userEvent.click(btnShareMeal);
    const linkcopied = await screen.findAllByText('Link copied!');
    expect(linkcopied[0]).toBeInTheDocument();

    userEvent.click(btnShareDrink);
    expect(linkcopied[1]).toBeInTheDocument();

    userEvent.click(btnDrink);
    expect(imageMeal).not.toBeInTheDocument();
    userEvent.click(btnMeal);
    expect(imageDrink).not.toBeInTheDocument();

    userEvent.click(imageMeal);
    const titleDetails = screen.findByRole('heading', {
      name: /tela de detalhes/i,
    });

    expect(titleDetails).toBeDefined();
  });
});
