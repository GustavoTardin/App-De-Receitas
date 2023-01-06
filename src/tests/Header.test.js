import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Drinks from '../pages/Drinks';

describe('testa componente Header', () => {
  test('testa se os elementos renderizam na tela', () => {
    renderWithRouter(<Drinks />);

    const title = screen.getByRole('heading', {
      name: /drinks/i,
    });
    const profile = screen.getByRole('img', {
      name: /profileicon/i,
    });

    const button = screen.getByRole('button', {
      name: /mostrar busca/i,
    });

    expect(title).toBeInTheDocument();
    expect(profile).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    userEvent.click(button);
    expect(input).not.toBeInTheDocument();
  });
});
