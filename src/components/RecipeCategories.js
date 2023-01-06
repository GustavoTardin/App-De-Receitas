import React from 'react';
import PropTypes, { shape } from 'prop-types';
import '../style/RecipeCategories.css';

export default function RecipeCategories(props) {
  const { categories, setCurrCategoryAux } = props;
  return (
    <div className="recipes-categories-container">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setCurrCategoryAux('noCategory') }
      >
        All
      </button>
      { categories.map((each) => {
        const { strCategory } = each;
        const dataTestId = `${strCategory}-category-filter`;
        return (
          <button
            type="button"
            key={ strCategory }
            data-testid={ dataTestId }
            onClick={ () => setCurrCategoryAux(strCategory) }
          >
            {strCategory}
          </button>
        );
      }) }
    </div>
  );
}

RecipeCategories.propTypes = {
  categories: PropTypes.arrayOf(shape({
    strCategory: PropTypes.string,
  })).isRequired,
  setCurrCategoryAux: PropTypes.func.isRequired,
};
