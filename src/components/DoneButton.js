import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function DoneButton({ allChecked, push, info }) {
  const [doneStorage, setDoneStorage] = useState([]);
  const [progressStorage, setProgressStorage] = useState({});

  useEffect(() => {
    function verifyStorage() {
      const storageDone = JSON.parse(localStorage.getItem('doneRecipes'));
      const storageProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setProgressStorage(storageProgress);
      if (!storageDone) localStorage.setItem('doneRecipes', JSON.stringify([]));
      else setDoneStorage(storageDone);
    }
    verifyStorage();
  }, []);

  const finishRecipe = () => {
    const newInfo = { ...info, doneDate: new Date() };
    console.log(doneStorage, progressStorage);
    const newDoneStorage = doneStorage.concat(newInfo);
    const newProgressStorage = { ...progressStorage };
    delete newDoneStorage[info.id];
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneStorage));
    localStorage.setItem('inProgressRecipes', JSON.stringify(newProgressStorage));
    push('/done-recipes');
  };

  return (
    <div>
      <button
        data-testid="finish-recipe-btn"
        disabled={ !allChecked }
        onClick={ finishRecipe }
        type="button"
      >
        Finish Recipe
      </button>
    </div>
  );
}

DoneButton.propTypes = {
  allChecked: PropTypes.bool.isRequired,
  push: PropTypes.func.isRequired,
  info: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default DoneButton;
