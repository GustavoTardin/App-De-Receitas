import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import Recipes from '../components/Recipes';

describe('Testa o componente Recipes', () => {
  it('Testa se aparece o botão da primeira categoria (Beef)', async () => {
    renderWithRouter(<Recipes option="meals" />);
    const firstCategoryButton = await screen.findByRole('button', {
      name: /beef/i,
    });
    expect(firstCategoryButton).toBeInTheDocument();
  });

  it('Testa se aparece o botão da primeira categoria (Ordinary Drink)', async () => {
    renderWithRouter(<Recipes option="drinks" />);
    const firstCategoryButton = await screen.findByRole('button', {
      name: /ordinary drink/i,
    });

    expect(firstCategoryButton).toBeInTheDocument();
  });
});

describe('Testa o componente Recipes com interação do usuário', () => {
  it('Testa se troca receita ao alterar categoria para Meals e retorna a All', async () => {
    renderWithRouter(<Recipes option="meals" />);
    const bigMacRecipe = await screen.findByRole('img', {
      name: /big mac/i,
    });

    expect(bigMacRecipe).toBeInTheDocument();

    const chickenCatButton = await screen.findByRole('button', {
      name: /chicken/i,
    });

    expect(chickenCatButton).toBeInTheDocument();

    userEvent.click(chickenCatButton);

    const chickenRecipe = await screen.findByAltText(/chick-fil-a sandwich/i);

    expect(chickenRecipe).toBeInTheDocument();

    const allCategoryButton = screen.getByRole('button', {
      name: /all/i,
    });

    expect(allCategoryButton).toBeInTheDocument();

    userEvent.click(allCategoryButton);

    const bigMacRecipeAux = await screen.findByRole('img', {
      name: /big mac/i,
    });

    expect(bigMacRecipeAux).toBeInTheDocument();
  });

  it('Testa se troca receita ao alterar categoria para Drinks e retorna a All', async () => {
    renderWithRouter(<Recipes option="drinks" />);
    const aceRecipe = await screen.findByAltText(/ace/i);

    expect(aceRecipe).toBeInTheDocument();

    const cocktailButton = await screen.findByTestId('Cocktail-category-filter');

    expect(cocktailButton).toBeInTheDocument();

    userEvent.click(cocktailButton);

    const ADMRecipe = await screen.findByAltText(/a\.d\.m\. \(after dinner mint\)/i);

    expect(ADMRecipe).toBeInTheDocument();

    const allCategoryButton = screen.getByRole('button', {
      name: /all/i,
    });

    expect(allCategoryButton).toBeInTheDocument();

    userEvent.click(allCategoryButton);

    const aceRecipeAux = await screen.findByAltText(/ace/i);

    expect(aceRecipeAux).toBeInTheDocument();
  });

  it('Testa se ao clicar duas vezes, volta para a categoria All', async () => {
    renderWithRouter(<Recipes option="meals" />);

    const bigMacRecipe = await screen.findByAltText(/big mac/i);

    expect(bigMacRecipe).toBeInTheDocument();

    const chickenCategory = await screen.findByRole('button', {
      name: /chicken/i,
    });

    expect(chickenCategory).toBeInTheDocument();

    userEvent.click(chickenCategory);
    userEvent.click(chickenCategory);

    const bigMacRecipeAux = await screen.findByAltText(/big mac/i);

    expect(bigMacRecipeAux).toBeInTheDocument();
  });
});
