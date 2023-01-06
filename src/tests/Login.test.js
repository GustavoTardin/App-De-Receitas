import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const emailId = 'email-input';
const passwordId = 'password-input';
const btnId = 'login-submit-btn';
describe('Verifica se na página de Login:', () => {
  it('Existem os inputs de email e senha, e o botão para entrar', () => {
    renderWithRouter(<App />, { initialEntries: ['/'] });
    const inputEmail = screen.getByTestId(emailId);
    const inputPassword = screen.getByTestId(passwordId);
    const btnSubmit = screen.getByTestId(btnId);
    const { pathname } = window.location;

    expect(pathname).toEqual('/');
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnSubmit).toBeInTheDocument();
  });

  it('O botão de entrar inicia desativado', () => {
    renderWithRouter(<App />, { initialEntries: ['/'] });
    const btnSubmit = screen.getByTestId(btnId);
    expect(btnSubmit).toBeDisabled();
  });

  it('O botão de entrar permanece desativado, ao digitar dados inválidos', () => {
    renderWithRouter(<App />, { initialEntries: ['/'] });
    const inputEmail = screen.getByTestId(emailId);
    const inputPassword = screen.getByTestId(passwordId);
    const btnSubmit = screen.getByTestId(btnId);

    userEvent.type(inputEmail, 'joao@email');
    userEvent.type(inputPassword, '1234567');
    expect(btnSubmit).toBeDisabled();

    userEvent.type(inputEmail, 'maria@email.com');
    userEvent.type(inputPassword, 'abcdef');
    expect(btnSubmit).toBeDisabled();
  });

  it('Se o botão entrar redireciona de forma correta', async () => {
    renderWithRouter(<App />, { initialEntries: ['/'] });
    const inputEmail = screen.getByTestId(emailId);
    const inputPassword = screen.getByTestId(passwordId);

    const email = 'joao@email.net';
    const password = '1234567';

    userEvent.type(inputEmail, email);
    expect(inputEmail).toHaveValue(email);

    userEvent.type(inputPassword, password);
    expect(inputPassword).toHaveValue(password);

    const btnSubmit = screen.getByTestId(btnId);
    expect(btnSubmit).toBeEnabled();
    userEvent.click(btnSubmit);

    const titleMeals = screen.getByRole('heading', {
      name: /meals/i,
    });
    expect(titleMeals).toBeInTheDocument();
  });
});
