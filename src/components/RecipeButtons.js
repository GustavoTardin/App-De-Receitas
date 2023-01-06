import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeButtons({ info }) {
  const [favoritesStorage, setFavoritesStorage] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    function verifyState() {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (storage) setFavoritesStorage(storage);
      else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([]));
        setFavoritesStorage([]);
      }
    }
    verifyState();
  }, []);

  useEffect(() => {
    const timeToAwait = 15000;
    if (linkCopied) {
      setTimeout(() => {
        setLinkCopied(false);
      }, timeToAwait);
    }
  }, [linkCopied]);

  useEffect(() => {
    const verifyFavorite = favoritesStorage.some(({ id, type }) => {
      const theType = info.type === type;
      const theId = info.id === id;
      return theType && theId;
    });
    if (verifyFavorite) setIsFavorited(true);
  }, [info, favoritesStorage]);

  const saveFavorite = async () => {
    if (isFavorited) {
      const newStorage = favoritesStorage.filter(({ id, type }) => {
        const theType = info.type !== type;
        const theId = info.id !== id;
        return theType && theId;
      });
      localStorage.setItem('favoriteRecipes', JSON.stringify([...newStorage]));
    } else {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...favoritesStorage, info]),
      );
    }
    setIsFavorited(!isFavorited);
  };

  const shareClick = () => {
    const url = (window.location.href).replace('/in-progress', '');
    copy(url);
    setLinkCopied(true);
  };

  return (
    <div>
      <button
        data-testid="share-btn"
        onClick={ shareClick }
        type="button"
      >
        <img alt="share-icon" src={ shareIcon } />
      </button>
      {linkCopied && (<span>Link copied!</span>)}
      <button
        onClick={ saveFavorite }
        type="button"
      >
        <img
          alt="Favorite Icon"
          data-testid="favorite-btn"
          src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
        />
      </button>
    </div>
  );
}

RecipeButtons.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default RecipeButtons;
