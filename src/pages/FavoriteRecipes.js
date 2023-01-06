import React, { useEffect, useState } from 'react';
import FavoriteCategories from '../components/FavoriteCategories';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCard';

function FavoriteRecipes() {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const categories = ['Meals', 'Drinks'];
  const [showMessage, setShowMessage] = useState(false);
  const copiedMessage = 'Link copied!';
  const copiedMessageStyle = { textAlign: 'center' };
  const [currFilter, setCurrFilter] = useState('noCategory');

  // set Favorite Recipes
  useEffect(() => {
    const localStorageItems = localStorage.getItem('favoriteRecipes');
    const localStorageParsed = JSON.parse(localStorageItems);

    if (currFilter === 'noCategory') {
      setFavoriteItems(localStorageParsed);
    } else {
      const newList = localStorageParsed.filter((each) => each.type === currFilter);
      setFavoriteItems(newList);
    }
  }, [currFilter]);

  useEffect(() => {
    if (showMessage) {
      const TIME_5S = 81300;
      setTimeout(() => {
        setShowMessage(false);
      }, TIME_5S);
    }
  }, [showMessage]);

  const setCurrFilterAux = (category) => {
    if (category === currFilter) {
      setCurrFilter('noCategory');
    } else setCurrFilter(category);
  };

  return (
    <>
      <Header title="Favorite Recipes" showSearchButton={ false } />
      { showMessage && <p style={ copiedMessageStyle }>{ copiedMessage }</p> }
      <div className="recipe-container">
        <FavoriteCategories
          categories={ categories }
          setCurrFilterAux={ setCurrFilterAux }
        />
        {
          favoriteItems && favoriteItems.length > 0 && (
            favoriteItems.map((each, index) => (
              <FavoriteCard
                key={ each.id }
                id={ each.id }
                img={ each.image }
                name={ each.name }
                category={ each.category }
                nationality={ each.nationality }
                index={ index }
                type={ each.type }
                setFavoriteItems={ setFavoriteItems }
                alcoholic={ each.alcoholicOrNot }
                setShowMessage={ setShowMessage }
              />
            ))
          )
        }
      </div>
      <Footer />
    </>
  );
}

export default FavoriteRecipes;
