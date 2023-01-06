import { arrayOf, shape, string } from 'prop-types';
import React from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RecipeButtons from './RecipeButtons';

function DrinkDetails(props) {
  const { drink, ingredients, instructions, recomendations, measure } = props;
  const history = useHistory();
  const { pathname } = history.location;
  const id = pathname.match(/\d/g).join('');
  const six = 6;

  return (
    <div>
      {
        drink && (
          <main>
            <h1 data-testid="recipe-title">
              {drink.strDrink}
            </h1>
            <h2 data-testid="recipe-category">
              {drink.strAlcoholic}
            </h2>
            <RecipeButtons
              info={ {
                id,
                type: 'drink',
                nationality: '',
                category: drink.strCategory,
                alcoholicOrNot: drink.strAlcoholic,
                name: drink.strDrink,
                image: drink.strDrinkThumb,
              } }
            />
            <img
              src={ drink.strDrinkThumb }
              alt="drink"
              data-testid="recipe-photo"
            />
            {

              ingredients?.map((ingredient, index) => (
                <section
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ index }
                >
                  <p>
                    {measure[index]}
                    {' '}
                    {ingredient}
                  </p>
                </section>
              ))
            }
            {
              instructions.map((instruction, index) => (
                <p data-testid="instructions" key={ index }>{instruction}</p>
              ))
            }
            <Carousel>
              {
                recomendations.length > 0
                && recomendations.slice(0, six).map((recomendation, i) => (
                  <CarouselItem data-testid={ `${i}-recommendation-card` } key={ i }>
                    <h5 data-testid={ `${i}-recommendation-title` }>
                      {recomendation.strMeal}
                    </h5>
                  </CarouselItem>
                ))
              }
            </Carousel>

            <button
              type="button"
              data-testid="start-recipe-btn"
              className="button"
              onClick={ () => history.push(`/drinks/${id}/in-progress`) }
            >
              Start Recipe

            </button>
          </main>
        )
      }
    </div>

  );
}

DrinkDetails.propTypes = {
  drink: shape({
    strAlcoholic: string,
    strDrink: string,
    strDrinkThumb: string,
  }).isRequired,
  ingredients: arrayOf(string).isRequired,
  instructions: arrayOf(string).isRequired,
  measure: arrayOf(arrayOf(string)).isRequired,
  recomendations: arrayOf(shape({})).isRequired,
};

export default DrinkDetails;
