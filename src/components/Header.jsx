import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Icon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const { title, showSearchButton } = props;

  const [showInput, setInput] = useState(false);

  const changeInput = () => {
    if (showInput) {
      setInput(false);
    } else {
      setInput(true);
    }
  };

  return (
    <header>

      <h1 data-testid="page-title">{title}</h1>

      <a href="/profile">
        <img
          data-testid="profile-top-btn"
          src={ Icon }
          alt="profileIcon"
        />
      </a>

      {
        showSearchButton && (
          <button
            type="button"
            data-testid="search-top-btn"
            src={ searchIcon }
            onClick={ changeInput }
          >
            Mostrar Busca

          </button>
        )
      }
      {
        showInput && (
          <SearchBar />
        )
      }

    </header>
  );
}

Header.propTypes = {
  showSearchButton: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
