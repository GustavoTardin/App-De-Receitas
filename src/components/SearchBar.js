import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

function SearchBar() {
  const [inputSearch, setInputSearch] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [valueRadio, setValueRadio] = useState('');
  const { setArrayRecipes } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    const searchByIngredient = () => {
      if (history.location.pathname === '/meals') {
        setEndpoint(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`);
      } else {
        setEndpoint(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputSearch}`);
      }
    };

    const searchByName = () => {
      if (history.location.pathname === '/meals') {
        setEndpoint(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`);
      } else {
        setEndpoint(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`);
      }
    };

    const searchByFirstLetter = () => {
      if (history.location.pathname === '/meals') {
        setEndpoint(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`);
      } else {
        setEndpoint(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputSearch}`);
      }
    };
    const ChangeEndpoint = () => {
      switch (valueRadio) {
      case 'Ingredient':
        searchByIngredient();
        break;
      case 'Name':
        searchByName();
        break;
      case 'First letter':
        if (inputSearch.length <= 1) {
          searchByFirstLetter();
        } else {
          global.alert('Your search must have only 1 (one) character');
          setInputSearch('');
        }
        break;
      default:
        break;
      }
    };
    ChangeEndpoint();
  }, [inputSearch, valueRadio, history.location.pathname]);

  function editedRecipe(data, type, limit) {
    const arrayWithLimit = data.filter((__, index) => index < limit);
    if (type === 'meals') {
      return arrayWithLimit.map((each) => ({
        id: each.idMeal,
        name: each.strMeal,
        img: each.strMealThumb,
      }));
    }
    if (type === 'drinks') {
      return arrayWithLimit.map((each) => ({
        id: each.idDrink,
        name: each.strDrink,
        img: each.strDrinkThumb,
      }));
    }
  }

  const renderRecipesMeals = (receiveRecipes) => {
    if (receiveRecipes.meals !== null) {
      const { meals } = receiveRecipes;
      if (meals.length === 1) {
        history.push(`/meals/${meals[0].idMeal}`);
      } else {
        const LIMIT = 12;
        setArrayRecipes(editedRecipe(meals, 'meals', LIMIT));
      }
    } else {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const renderRecipesDrinks = (receiveRecipes) => {
    if (receiveRecipes.drinks !== null) {
      const { drinks } = receiveRecipes;
      if (drinks.length === 1) {
        history.push(`/drinks/${drinks[0].idDrink}`);
      } else {
        const LIMIT = 12;
        setArrayRecipes(editedRecipe(drinks, 'drinks', LIMIT));
      }
    } else {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const searchRecipes = async () => {
    const requestRecipes = await fetch(endpoint);
    const receiveRecipes = await requestRecipes.json();
    if (history.location.pathname === '/meals') {
      renderRecipesMeals(receiveRecipes);
    }
    if (history.location.pathname === '/drinks') {
      renderRecipesDrinks(receiveRecipes);
    }
  };

  return (
    <section>
      <input
        type="text"
        data-testid="search-input"
        value={ inputSearch }
        onChange={ ({ target }) => setInputSearch(target.value) }
      />
      <label htmlFor="ingredientSearch">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          value="Ingredient"
          id="ingredientSearch"
          name="search-input"
          onClick={ ({ target }) => setValueRadio(target.value) }
        />
        Ingredient
      </label>
      <label htmlFor="nameSearch">
        <input
          type="radio"
          data-testid="name-search-radio"
          value="Name"
          id="nameSearch"
          name="search-input"
          onClick={ ({ target }) => setValueRadio(target.value) }
        />
        Name
      </label>
      <label htmlFor="firstLetterSearch">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          value="First letter"
          id="firstLetterSearch"
          name="search-input"
          onClick={ ({ target }) => setValueRadio(target.value) }
        />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchRecipes }
      >
        Buscar
      </button>
    </section>
  );
}

export default SearchBar;
