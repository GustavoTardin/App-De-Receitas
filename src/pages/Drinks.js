import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <div>
      <Header title="Drinks" showSearchButton />
      <Recipes option="drinks" />
      <Footer />
    </div>
  );
}

export default Drinks;
