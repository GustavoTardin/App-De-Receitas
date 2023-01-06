import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Login({ history }) {
  const [disableBtn, setDisableBtn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    function validForm() {
      const minLength = 7;
      const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
      const isValidPassword = password.length >= minLength;
      const condition = email.match(regexEmail) && isValidPassword;
      return !condition;
    }

    setDisableBtn(validForm());
  }, [password, email]);

  const handleSubmit = () => {
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/meals');
  };

  return (
    <form>
      <input
        data-testid="email-input"
        name="inputEmail"
        onChange={ ({ target }) => setEmail(target.value) }
        type="text"
        value={ email }
        placeholder="Digite seu Email"
      />
      <input
        data-testid="password-input"
        name="inputPassword"
        onChange={ ({ target }) => setPassword(target.value) }
        type="password"
        value={ password }
        placeholder="Digita sua senha"
      />
      <button
        data-testid="login-submit-btn"
        disabled={ disableBtn }
        onClick={ handleSubmit }
        type="button"
      >
        Enter
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
