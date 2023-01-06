import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Profile from '../pages/Profile';

describe('testa página de Profile', () => {
  it('testa se os elementos renderizam corretamente', async () => {
    renderWithRouter(
      <Profile />,
      { initialEntries: ['/profile'] },
    );
    const header = await screen.findByRole('heading', {
      name: /profile/i,
    });
    const email = await screen.findByTestId('profile-email');
    const favoriteButton = await screen.findByRole('button', {
      name: /favorite recipes/i,
    });
    const doneButton = screen.getByRole('button', {
      name: /done recipes/i,
    });
    const logOutButton = screen.getByRole('button', {
      name: /logout/i,
    });
    const logo = screen.getByRole('img', {
      name: /profileicon/i,
    });

    expect(email).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(doneButton).toBeInTheDocument();
    expect(logOutButton).toBeInTheDocument();
  });
  it('testa se o botão de Favorite redireciona corretamente', () => {
    const { history } = renderWithRouter(
      <Profile />,
      { initialEntries: ['/profile'] },
    );
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
    const favoriteButton = screen.getByRole('button', {
      name: /favorite recipes/i,
    });
    waitFor(() => expect(favoriteButton).toBeInTheDocument());
    userEvent.click(favoriteButton);
    waitFor(() => expect(pathname).toBe('/favorite-recipes'));
  });
  it('testa se o botão de Done redireciona corretamente', () => {
    const { history } = renderWithRouter(
      <Profile />,
      { initialEntries: ['/profile'] },
    );
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
    const doneButton = screen.getByRole('button', {
      name: /done recipes/i,
    });
    waitFor(() => expect(doneButton).toBeInTheDocument());
    userEvent.click(doneButton);
    waitFor(() => expect(pathname).toBe('/done-recipes'));
  });
  it('testa se o botão de Logout redireciona corretamente', () => {
    const { history } = renderWithRouter(
      <Profile />,
      { initialEntries: ['/profile'] },
    );
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
    const logOutButton = screen.getByRole('button', {
      name: /logout/i,
    });
    waitFor(() => expect(logOutButton).toBeInTheDocument());
    userEvent.click(logOutButton);
    waitFor(() => expect(pathname).toBe('/'));
  });
});
