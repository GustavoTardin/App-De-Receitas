import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function FavoriteButtons(props) {
  const { item, setFavoriteItems, urlToCopy, setShowMessage } = props;
  // const { img, name, index, type, id } = item;
  const { name, index, id } = item;
  const favoriteId = `${index}-horizontal-favorite-btn`;
  const shareId = `${index}-horizontal-share-btn`;

  function favoriteButton() {
    const localStorageItems = localStorage.getItem('favoriteRecipes');
    const localStorageParsed = JSON.parse(localStorageItems);
    const newList = localStorageParsed.filter((each) => each.id !== id);
    setFavoriteItems(newList);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
  }

  function shareButton() {
    const url = (window.location.href).replace('/favorite-recipes', urlToCopy);
    copy(url);
    setShowMessage(true);
  }

  return (
    <div className="favorite-card-buttons">
      <p />
      <button
        src={ blackHeartIcon }
        data-testid={ favoriteId }
        type="button"
        onClick={ favoriteButton }
      >
        <img alt={ name } src={ blackHeartIcon } />
      </button>
      <button
        src={ shareIcon }
        data-testid={ shareId }
        type="button"
        onClick={ shareButton }
      >
        <img alt={ name } src={ shareIcon } />
      </button>
    </div>
  );
}

FavoriteButtons.propTypes = {
  item: PropTypes.shape({
    img: PropTypes.string,
    name: PropTypes.string,
    index: PropTypes.number,
    id: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  setFavoriteItems: PropTypes.func.isRequired,
  urlToCopy: PropTypes.string.isRequired,
  setShowMessage: PropTypes.func.isRequired,
};
