import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [arrayRecipes, setArrayRecipes] = useState('');
  const value = useMemo(() => ({
    arrayRecipes, setArrayRecipes,
  }), [arrayRecipes]);
  return (
    <Context.Provider value={ value }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
