import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const email = localStorage.getItem('user');
  const history = useHistory();

  const logOut = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" showSearchButton={ false } />
      <h4 data-testid="profile-email">{email}</h4>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes

      </button>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes

      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logOut }
      >
        Logout

      </button>

      <Footer />
    </div>
  );
}

export default Profile;
