export const getMeal = async (meal, ingredient, instruction, id) => {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const api = await fetch(ENDPOINT);
  const foods = await api.json();
  const { meals } = foods;
  const food = meals[0];
  meal(food);

  const values = Object.entries(food);

  const instructionsArray = values.filter((element) => (
    element[0].includes('strInstructions')));
  const singleInstruction = instructionsArray.map((need) => need.pop());
  const validInstructions = singleInstruction.filter((string) => string !== null);
  instruction(validInstructions);

  const needs = values.filter((element) => (
    element[0].includes('strIngredient')));
  const singleStrings = needs.map((need) => need.pop());
  const validIngredients = singleStrings.filter((string) => string !== '');
  ingredient(validIngredients);
};

export const getDrinkRecommendation = async (recomendation) => {
  const RECOMENDATIONENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(RECOMENDATIONENDPOINT);
  const json = await response.json();
  recomendation(json.drinks);
};

export const getDrink = async (drink, ing, inst, id) => {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const api = await fetch(ENDPOINT);
  const liquids = await api.json();
  const { drinks } = liquids;
  const beverage = drinks[0];
  drink(beverage);

  const values = Object.entries(beverage);
  const needs = values.filter((element) => (
    element[0].includes('strIngredient')));
  const singleStrings = needs.map((need) => need.pop());
  const validIngredients = singleStrings.filter((string) => string !== null);
  ing(validIngredients);

  const instructionsArray = values.filter((element) => (
    element[0].includes('strInstructions')));
  const singleInstruction = instructionsArray.map((need) => need.pop());
  const validInstructions = singleInstruction.filter((string) => string !== null);
  inst(validInstructions);
};

export const getMealRecommendation = async (recommendation) => {
  const RECOMENDATIONENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(RECOMENDATIONENDPOINT);
  const json = await response.json();
  recommendation(json.meals);
};
