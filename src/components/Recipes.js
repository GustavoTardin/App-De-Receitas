import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';
import Context from '../context/Context';
import '../style/Recipes.css';
import RecipeCategories from './RecipeCategories';

async function getFetch(endpoint) {
  const promise = await fetch(endpoint);
  const data = await promise.json();
  return data;
}

function editedRecipe(data, type, limit) {
  const array = data.filter((__, index) => index < limit);

  if (type === 'meals') {
    return array.map((each) => ({
      id: each.idMeal,
      name: each.strMeal,
      img: each.strMealThumb,
      type,
    }));
  }

  if (type === 'drinks') {
    return array.map((each) => ({
      id: each.idDrink,
      name: each.strDrink,
      img: each.strDrinkThumb,
      type,
    }));
  }
}

async function setCategoriesAux(option, setCategories) {
  const LIMIT = 5;
  if (option === 'meals') {
    const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const data = await getFetch(ENDPOINT);
    const { meals } = data;
    const getFive = meals.filter((__, index) => index < LIMIT);
    setCategories(getFive);
  }

  if (option === 'drinks') {
    const ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const data = await getFetch(ENDPOINT);
    const { drinks } = data;
    const getFive = drinks.filter((__, index) => index < LIMIT);
    setCategories(getFive);
  }
}

async function pageConfig(option, setRecipes, setCategories, currCategory) {
  const DEFAULT_LIMIT = 12;
  setCategoriesAux(option, setCategories);
  if (option === 'meals') {
    let ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    if (currCategory !== 'noCategory') {
      const link = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${currCategory}`;
      ENDPOINT = link;
    }
    const recipesData = await getFetch(ENDPOINT);
    const { meals } = recipesData;
    setRecipes(editedRecipe(meals, 'meals', DEFAULT_LIMIT));
  }
  if (option === 'drinks') {
    let ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    if (currCategory !== 'noCategory') {
      const link = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${currCategory}`;
      ENDPOINT = link;
    }
    const recipesData = await getFetch(ENDPOINT);
    const { drinks } = recipesData;
    setRecipes(editedRecipe(drinks, 'drinks', DEFAULT_LIMIT));
  }
}

export default function Recipes({ option }) {
  const { arrayRecipes } = useContext(Context);
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currCategory, setCurrCategory] = useState('noCategory');

  useEffect(() => {
    pageConfig(option, setRecipes, setCategories, currCategory);
  }, [option, currCategory]);

  const setCurrCategoryAux = (category) => {
    if (category === currCategory) {
      setCurrCategory('noCategory');
    } else setCurrCategory(category);
  };

  return (
    <div className="recipe-container" data-testid="recipe-container">
      <RecipeCategories
        categories={ categories }
        setCurrCategoryAux={ setCurrCategoryAux }
      />
      { arrayRecipes === '' ? (
        recipes.length > 0 && (
          recipes.map((each, index) => (
            <RecipeCard
              key={ each.id }
              id={ each.id }
              img={ each.img }
              name={ each.name }
              index={ index }
              type={ each.type }
            />
          ))
        )
      ) : (
        arrayRecipes.map((recipe, index) => (
          <RecipeCard
            key={ recipe.id }
            img={ recipe.img }
            name={ recipe.name }
            index={ index }
          />
        ))
      )}
    </div>
  );
}

Recipes.propTypes = {
  option: PropTypes.string.isRequired,
};
