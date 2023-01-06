import { arrayOf, shape, string } from 'prop-types';
import React from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RecipeButtons from './RecipeButtons';

function MealDetails(props) {
  const { meal, ingredients, instructions, recomendations, measure } = props;
  const six = 6;
  const history = useHistory();
  const { pathname } = history.location;
  const id = pathname.match(/\d/g).join('');

  return (
    <div>
      {
        meal && (
          <main>
            <h1 data-testid="recipe-title">
              {meal.strMeal}
            </h1>
            <h2 data-testid="recipe-category">{meal.strCategory}</h2>
            <RecipeButtons
              info={ {
                id,
                type: 'meal',
                nationality: meal.strArea,
                category: meal.strCategory,
                alcoholicOrNot: '',
                name: meal.strMeal,
                image: meal.strMealThumb,
              } }
            />
            <img
              src={ meal.strMealThumb }
              alt="meal"
              data-testid="recipe-photo"
            />
            {

              ingredients.map((ingredient, i) => (

                <section
                  data-testid={ `${i}-ingredient-name-and-measure` }
                  key={ i }
                >
                  <p>
                    {measure[i]}
                    {' '}
                    {ingredient}
                  </p>
                </section>
              ))
            }
            {
              instructions.map((instruction, index) => (
                <div data-testid="instructions" key={ index }>

                  <p>{instruction}</p>
                </div>
              ))
            }
            <iframe
              data-testid="video"
              width="853"
              height="480"
              src={ meal.strYoutube.replace('watch?v=', 'embed/') }
              frameBorder="0"
              allow="accelerometer; autoplay;
           clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={ meal.strMeal }
            />
            <Carousel>
              {
                recomendations.length > 0
            && recomendations.slice(0, six).map((recomendation, i) => (
              <CarouselItem data-testid={ `${i}-recommendation-card` } key={ i }>
                <h5 data-testid={ `${i}-recommendation-title` }>
                  {recomendation.strDrink}
                </h5>
              </CarouselItem>
            ))
              }
            </Carousel>
            <br />
            <br />
            <br />
            <br />
            <br />
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="button"
              onClick={ () => history.push(`/meals/${id}/in-progress`) }
            >
              Start Recipe

            </button>
          </main>
        )
      }
    </div>
  );
}

MealDetails.propTypes = {
  meal: shape({
    strMealThumb: string,
    strYoutube: string,
    strMeal: string,
    strCategory: string,
  }).isRequired,
  ingredients: arrayOf(string).isRequired,
  instructions: arrayOf(string).isRequired,
  measure: arrayOf(arrayOf(string)).isRequired,
  recomendations: arrayOf(shape({})).isRequired,
};

export default MealDetails;
