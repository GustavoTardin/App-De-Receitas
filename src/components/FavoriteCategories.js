import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function FavoriteCategories(props) {
  const { categories, setCurrFilterAux } = props;
  const [categoriesIds, setCategoriesIds] = useState([]);

  useEffect(() => {
    const fixedIds = categories.map((each) => each.replace('s', '').toLowerCase());
    setCategoriesIds(fixedIds);
  }, [categories]);

  return (
    categoriesIds.length > 0 && (
      <div className="recipes-categories-container">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setCurrFilterAux('noCategory') }
        >
          All
        </button>
        { categories.map((each, i) => {
          const dataTestId = `filter-by-${categoriesIds[i]}-btn`;
          return (
            <button
              type="button"
              key={ each }
              data-testid={ dataTestId }
              onClick={ () => setCurrFilterAux(categoriesIds[i]) }
            >
              { each }
            </button>
          );
        }) }
      </div>
    )
  );
}

FavoriteCategories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCurrFilterAux: PropTypes.func.isRequired,
};
