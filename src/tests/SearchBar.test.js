import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';
import renderWithRouter from '../helpers/renderWithRouter';
import { recipesMockMeals, mockRecipesDrink, mockRecipesDrinkGatherThenOne, mockRecipesMealsGatherThenOne } from '../mocks/mockRecipes';

const searchInput = 'search-input';
const radioNameInput = 'name-search-radio';
const rotaDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau';
const rotaMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=xablau';

describe('testa componente SearchBar', () => {
  test('testa se os elementos renderizam na tela', () => {
    const { history } = renderWithRouter(<SearchBar />);
    history.push('/meals');
    const jsdomAlert = window.alert;
    window.alert = () => {};

    const inputSearch = screen.getByTestId(searchInput);
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const radioName = screen.getByTestId(radioNameInput);
    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');

    const button = screen.getByRole('button', {
      name: /buscar/i,
    });

    expect(inputSearch).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioFirstLetter).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    userEvent.type(inputSearch, 'Trigo');
    expect(inputSearch).toHaveValue('Trigo');
    userEvent.click(radioName);
    expect(radioName).toBeChecked();

    userEvent.click(radioIngredient);
    expect(radioIngredient).toBeChecked();

    userEvent.click(radioFirstLetter);
    expect(radioFirstLetter).toBeChecked();

    userEvent.type(inputSearch, 'A');
    userEvent.click(button);
    const meal = screen.findByText(/a1/i);
    expect(meal).toBeDefined();

    userEvent.click(radioFirstLetter);
    userEvent.type(inputSearch, 'xablau');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/meals');

    history.push('/drinks');
    userEvent.click(radioFirstLetter);
    userEvent.type(inputSearch, 'A');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/drinks');
    const drink = screen.findByText(/a1/i);
    expect(drink).toBeDefined();

    userEvent.click(radioName);
    userEvent.type(inputSearch, 'Apple');
    userEvent.click(button);
    const drinkName = screen.findByText(/Applecar/i);
    expect(drinkName).toBeDefined();

    userEvent.click(radioIngredient);
    userEvent.type(inputSearch, 'Water');
    userEvent.click(button);
    const drinkIngredient = screen.findByText(/Adam Sunrise/i);
    expect(drinkIngredient).toBeDefined();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: null }),
    });

    userEvent.click(radioName);
    userEvent.type(inputSearch, 'xablau');
    userEvent.click(button);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=AppleWaterxablau');
    window.alert = jsdomAlert;
  });

  test('Testa alerta na rota /meals', () => {
    const { history } = renderWithRouter(<SearchBar />);

    const jsdomAlert = window.alert;// remember the jsdom alert
    window.alert = () => {};

    history.push('/meals');
    jest.spyOn(global, 'fetch');

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ meals: null }),
    });

    const inputSearch = screen.getByTestId(searchInput);
    const radioName = screen.getByTestId(radioNameInput);
    const button = screen.getByRole('button', {
      name: /buscar/i,
    });

    userEvent.click(radioName);
    userEvent.type(inputSearch, 'xablau');
    userEvent.click(button);
    expect(global.fetch).toHaveBeenCalledWith(rotaMeals);
    window.alert = jsdomAlert;
  });

  test('Testa rota /meals com length 1', () => {
    const { history } = renderWithRouter(<SearchBar />);

    history.push('/meals');
    jest.spyOn(global, 'fetch');

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(recipesMockMeals),
    });

    const inputSearch = screen.getByTestId(searchInput);
    const radioName = screen.getByTestId(radioNameInput);
    const button = screen.getByRole('button', {
      name: /buscar/i,
    });

    userEvent.click(radioName);
    userEvent.type(inputSearch, 'xablau');
    userEvent.click(button);
    expect(global.fetch).toHaveBeenCalledWith(rotaMeals);
  });

  test('Testa rota /drinks com length 1', () => {
    const { history } = renderWithRouter(<SearchBar />);

    history.push('/drinks');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockRecipesDrinkGatherThenOne),
    });

    const inputSearch = screen.getByTestId(searchInput);
    const radioName = screen.getByTestId(radioNameInput);
    const button = screen.getByRole('button', {
      name: /buscar/i,
    });

    userEvent.click(radioName);
    userEvent.type(inputSearch, 'xablau');
    userEvent.click(button);
    expect(global.fetch).toHaveBeenCalledWith(rotaDrinks);
  });

  test('Testa rota /drinks com length maior que 1', () => {
    const { history } = renderWithRouter(<SearchBar />);

    history.push('/drinks');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockRecipesDrink),
    });

    const inputSearch = screen.getByTestId(searchInput);
    const radioName = screen.getByTestId(radioNameInput);
    const button = screen.getByRole('button', {
      name: /buscar/i,
    });

    userEvent.click(radioName);
    userEvent.type(inputSearch, 'xablau');
    userEvent.click(button);
    expect(global.fetch).toHaveBeenCalledWith(rotaDrinks);
  });

  test('Testa rota /meals com length maior que 1', () => {
    const { history } = renderWithRouter(<SearchBar />);

    history.push('/meals');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockRecipesMealsGatherThenOne),
    });

    const inputSearch = screen.getByTestId(searchInput);
    const radioName = screen.getByTestId(radioNameInput);
    const button = screen.getByRole('button', {
      name: /buscar/i,
    });

    userEvent.click(radioName);
    userEvent.type(inputSearch, 'xablau');
    userEvent.click(button);
    expect(global.fetch).toHaveBeenCalledWith(rotaMeals);
  });
});
