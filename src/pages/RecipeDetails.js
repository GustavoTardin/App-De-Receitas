import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getMeal,
  getDrink,
  getMealRecommendation,
  getDrinkRecommendation } from '../helpers/services';
import '../style/RecipeDetails.css';
import DrinkDetails from '../components/DrinkDetails';
import MealDetails from '../components/MealDetails';

function RecipeDetails() {
  const history = useHistory();
  const { pathname } = history.location;
  const id = pathname.match(/\d/g).join('');

  const [meal, setMeal] = useState([]);
  const [drink, setDrinks] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [measure, setMeasure] = useState([]);

  useEffect(() => {
    const mealEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const drinkEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

    const getMealMeasure = async () => {
      const api = await fetch(mealEndpoint);
      const foods = await api.json();
      const { meals } = foods;
      const beverage = meals[0];
      const values = Object.entries(beverage);
      const measureArray = values.filter((element) => (
        element[0].includes('strMeasure')));
      const singleMeasure = measureArray.filter((mea) => (
        mea.shift()));
      const quantity = singleMeasure.filter((single) => single[0] !== null);
      setMeasure(quantity);
    };

    const getDrinkMeasure = async () => {
      const api = await fetch(drinkEndpoint);
      const liquids = await api.json();
      const { drinks } = liquids;
      const beverage = drinks[0];
      const values = Object.entries(beverage);
      const measureArray = values.filter((element) => (
        element[0].includes('strMeasure')));
      const singleMeasure = measureArray.filter((mea) => (
        mea.shift()));
      const quantity = singleMeasure.filter((single) => single[0] !== null);
      setMeasure(quantity);
    };

    async function getDetails() {
      if (pathname.includes('meals')) {
        getMeal(setMeal, setIngredients, setInstructions, id);
        getDrinkRecommendation(setRecomendations);
        await getMealMeasure();
      } else {
        getDrink(setDrinks, setIngredients, setInstructions, id);
        getMealRecommendation(setRecomendations);
        await getDrinkMeasure();
      }
    }
    getDetails();
  }, [id, pathname]);

  return (
    <div>
      <h1>Tela de detalhes</h1>
      {
        meal.length !== 0
          && (
            <MealDetails
              meal={ meal }
              ingredients={ ingredients }
              instructions={ instructions }
              recomendations={ recomendations }
              measure={ measure }
            />
          )
      }
      {
        drink.length !== 0
  && (
    <DrinkDetails
      drink={ drink }
      ingredients={ ingredients }
      instructions={ instructions }
      recomendations={ recomendations }
      measure={ measure }
    />
  )
      }
    </div>
  );
}

export default RecipeDetails;
