import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DoneButton from '../components/DoneButton';
import RecipeButtons from '../components/RecipeButtons';

function RecipeInProgress({ match: { params: { id }, path }, history: { push } }) {
  const [resultAPI, setResultsAPI] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipeData, setRecipeData] = useState({});
  const [recipeType, setRecipeType] = useState('');
  const [allChecked, setAllChecked] = useState(false);
  const [buttonInfo, setButtonInfo] = useState({});

  async function getStorage() {
    const response = await JSON.parse(localStorage.getItem('inProgressRecipes'));
    return response;
  }
  async function setStorage() {
    const progress = {
      drinks: {},
      meals: {},
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
  }

  useEffect(() => {
    const type = path.split('/')[1];
    async function fetchRecipe() {
      let URL;
      const URL1 = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const URL2 = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      if (type === 'meals') URL = URL1;
      else URL = URL2;
      const result = await fetch(URL)
        .then((response) => response.json())
        .then(({ [type]: [obj] }) => obj);
      setResultsAPI(result);
    }
    setRecipeType(type);
    fetchRecipe();
  }, [id, path]);

  useEffect(() => {
    const type = path.split('/')[1];
    function filterRecipe() {
      const keys = Object.keys(resultAPI);
      const values = Object.values(resultAPI);
      const cleanResult = {
        ingredients: [],
      };
      values.forEach((value, i) => {
        if (!value || value === ' ') return '';
        if (keys[i].includes('strIngredient')) {
          const { ingredients } = cleanResult;
          cleanResult.ingredients = [
            ...ingredients,
            { checked: false, name: value, measure: '' },
          ];
        } else if (keys[i].includes('strMeasure')) {
          const actual = +(keys[i].split('strMeasure')[1]) - +'1';
          cleanResult.ingredients[actual].measure = value;
        } else if (keys[i].includes('str')) {
          const newKey = (keys[i].slice(+'3', -(keys[i].length - +'4')))
            .toLowerCase() + keys[i].slice(+'4');
          cleanResult[newKey] = value;
        } else cleanResult[keys[i]] = value;
      });
      return cleanResult;
    }
    const recipe = { ...filterRecipe() };
    async function defineRecipe() {
      let storage = await getStorage();
      if (!storage) {
        setStorage();
        storage = {
          drinks: {},
          meals: {},
        };
      }
      const actualKeys = Object.keys(storage[`${type}`]);
      const isSaved = actualKeys.some((key) => key === id);
      if (isSaved) {
        const { ingredients } = storage[`${type}`][`${id}`];
        recipe.ingredients = ingredients;
      }
    }
    defineRecipe();
    setRecipeData(recipe);
    setIsLoaded(true);
  }, [id, path, resultAPI]);

  useEffect(() => {
    const { ingredients } = recipeData;
    if (isLoaded) {
      const verification = ingredients.every(({ checked }) => checked === true);
      if (ingredients.length > 0 && verification) setAllChecked(true);
    }
  }, [isLoaded, recipeData]);

  useEffect(() => {
    const info = {
      id,
      type: recipeType.slice(0, -'1'),
      nationality: recipeData.area ? recipeData.area : '',
      category: recipeData.category,
      alcoholicOrNot: recipeData.alcoholic ? recipeData.alcoholic : '',
      name: recipeType === 'meals' ? recipeData.meal : recipeData.drink,
      image: recipeType === 'meals'
        ? recipeData.mealThumb
        : recipeData.drinkThumb,
    };
    setButtonInfo(info);
  }, [id, recipeData, recipeType]);

  const handleCheck = async ({ target: { value, checked } }) => {
    const { ingredients } = recipeData;
    ingredients[value].checked = checked;
    const storage = await getStorage();
    storage[`${recipeType}`][`${id}`] = { ...recipeData, ingredients };
    setRecipeData({ ...recipeData, ingredients });
    localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
  };

  return (
    <div>
      {isLoaded
        ? (
          <div>
            <h1>
              {'Preparing: '}
              <span data-testid="recipe-title">
                {recipeType === 'meals' ? recipeData.meal : recipeData.drink}
              </span>
            </h1>
            <h2>
              {'Category: '}
              <span data-testid="recipe-category">{recipeData.category}</span>
            </h2>
            <RecipeButtons
              info={ buttonInfo }
            />
            <img
              alt={ recipeType === 'meals' ? recipeData.meal : recipeData.drink }
              data-testid="recipe-photo"
              src={ recipeType === 'meals'
                ? recipeData.mealThumb
                : recipeData.drinkThumb }
            />
            <h3>Ingredients</h3>
            <div>
              {(recipeData.ingredients)
                .map((ingredient, i) => {
                  let style = { textDecorationLine: '' };
                  if (ingredient.checked) {
                    style = {
                      textDecoration: 'line-through solid rgb(0,0,0)',
                    };
                  }
                  return (
                    <label
                      data-testid={ `${i}-ingredient-step` }
                      htmlFor={ `${i}-ingredient-step` }
                      key={ i }
                      style={ style }
                    >
                      <input
                        defaultChecked={ ingredient.checked }
                        id={ `${i}-ingredient-step` }
                        onClick={ handleCheck }
                        type="checkbox"
                        value={ `${i}` }
                      />
                      <span>{`${ingredient.measure} ${ingredient.name}`}</span>
                    </label>
                  );
                })}
            </div>
            <h3>Prepare Mode</h3>
            <p data-testid="instructions">
              {recipeData.instructions}
            </p>
            <DoneButton
              allChecked={ allChecked }
              info={ {
                ...buttonInfo,
                tags: recipeData.tags
                  ? recipeData.tags.split(',')
                  : [] } }
              push={ push }
            />
          </div>
        )
        : <span>Carregando...</span>}
    </div>
  );
}

RecipeInProgress.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeInProgress;
