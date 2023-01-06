import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('testa página de Details', () => {
  beforeEach(() => {
    window.document.execCommand = jest.fn(() => true);
  });
  it('testa se os elementos renderizam corretamente se for uma bebida', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks/178319');
    });
    const img = await screen.findByRole('img', {
      name: /drink/i,
    });
    const button = screen.getByRole('button', {
      name: /start recipe/i,
    });
    const changeButton = screen.getByRole('button', {
      name: /previous/i,
    });

    userEvent.click(changeButton);
    userEvent.click(button);

    expect(img).toBeDefined();
    expect(button).toBeDefined();
    expect(button).toBeDefined();
    expect(changeButton).toBeDefined();
  });
  it('testa se os elementos renderizam corretamente se for uma comida', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals/52785');
    });
    const title = await screen.findByRole('heading', {
      name: /dal fry/i,
    });
    const category = await screen.findByRole('heading', {
      name: /vegetarian/i,
    });
    const quantity = screen.getByTestId('15-ingredient-name-and-measure');
    const youtube = await screen.findByTitle(/dal fry/i);
    const changeButton = screen.getByRole('button', {
      name: /previous/i,
    });
    const button = screen.getByRole('button', {
      name: /start recipe/i,
    });

    userEvent.click(changeButton);
    userEvent.click(button);

    expect(title).toBeDefined();
    expect(category).toBeDefined();
    expect(quantity).toBeDefined();
    expect(youtube).toBeDefined();
    expect(button).toBeDefined();
    expect(changeButton).toBeDefined();
  });
});
