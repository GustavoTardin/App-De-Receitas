import React from 'react';
import PropTypes from 'prop-types';
import '../style/FavoriteCard.css';
import FavoriteButtons from './FavoriteButtons';

export default function FavoriteCard(props) {
  const { img,
    name,
    index,
    type,
    alcoholic,
    id,
    setFavoriteItems,
    category,
    nationality,
    setShowMessage } = props;
  // const capitalizeType = type.charAt(0).toUpperCase() + type.slice(1);
  const tagId = `${index}-recipe-card`;
  const imgId = `${index}-horizontal-image`;
  const nameId = `${index}-horizontal-name`;
  const categoryId = `${index}-horizontal-top-text`;
  const href = `/${type}s/${id}`;
  const topText = type === 'meal' ? `${nationality} - ${category}` : alcoholic;
  return (
    <div data-testid={ tagId } className="favorite-card">
      <div className="favorite-card-inside">
        <a href={ href }>
          <img data-testid={ imgId } src={ img } alt={ name } />
        </a>
        <div className="favorite-card-texts">
          <a href={ href }>
            <p data-testid={ nameId }>
              {name}
            </p>
          </a>
          <p data-testid={ categoryId }>
            {topText}
          </p>
          <FavoriteButtons
            setFavoriteItems={ setFavoriteItems }
            item={ props }
            urlToCopy={ href }
            setShowMessage={ setShowMessage }
          />
        </div>
      </div>
    </div>
  );
}

FavoriteCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  setFavoriteItems: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  setShowMessage: PropTypes.func.isRequired,
  nationality: PropTypes.string.isRequired,
  alcoholic: PropTypes.string.isRequired,
};
