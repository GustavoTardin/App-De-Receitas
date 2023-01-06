import React from 'react';
import PropTypes from 'prop-types';
import '../style/RecipeCard.css';

export default function RecipeCard({ img, name, index, type, id }) {
  const tagId = `${index}-recipe-card`;
  const imgId = `${index}-card-img`;
  const nameId = `${index}-card-name`;
  const href = `/${type}/${id}`;
  return (
    <div data-testid={ tagId } className="recipe-card">
      <a href={ href }>
        <img data-testid={ imgId } src={ img } alt={ name } />
        <p data-testid={ nameId }>{name}</p>
      </a>
    </div>
  );
}

RecipeCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
