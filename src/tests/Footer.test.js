import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import React from 'react';
import Footer from '../components/Footer';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa componente Footer', () => {
  it('Verifica se o footer está na tela com seus botões', () => {
    const { history } = renderWithRouter(
      <Footer />,
      ['/meals'],
    );

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    expect(drinkBtn).toBeInTheDocument();
    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    expect(mealsBtn).toBeInTheDocument();
    userEvent.click(mealsBtn);
    history.push('/meals');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');
  });
});
