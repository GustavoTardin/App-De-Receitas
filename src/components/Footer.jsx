import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../style/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <a href="/drinks">
        <button type="button">
          <img
            alt="drinks-bottom"
            src={ drinkIcon }
            data-testid="drinks-bottom-btn"
          />
        </button>
      </a>
      <a href="/meals">
        <button type="button">
          <img
            alt="drinks-bottom"
            src={ mealIcon }
            data-testid="meals-bottom-btn"
          />
        </button>
      </a>
    </footer>
  );
}

export default Footer;
