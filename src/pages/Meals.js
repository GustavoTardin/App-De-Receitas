import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Meals() {
  return (
    <div data-testid="title-meals">
      <Header title="Meals" showSearchButton />
      <Recipes option="meals" />
      <Footer />
    </div>
  );
}

export default Meals;
