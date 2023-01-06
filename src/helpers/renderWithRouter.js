import React, { createContext } from 'react';

import { Router } from 'react-router-dom';

import { createMemoryHistory } from 'history';

import { render } from '@testing-library/react';

import Provider from '../context/Provider';

const renderWithRouter = (component, {
  context = createContext(),
  initialEntries = ['/'],
  history = createMemoryHistory({ initialEntries }),
} = {}) => ({
  ...render(
    <Router history={ history }>
      <Provider value={ context }>
        {component}
      </Provider>
    </Router>,
  ),
  history,
  context,
});

export default renderWithRouter;
