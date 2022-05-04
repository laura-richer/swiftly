import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getToken, checkToken } from './utils/token.js';
import { LOGIN_URL } from './utils/vars.js';

import Header from './components/Header.js';
import Form from './components/Form.js';

import './scss/app.scss';

function App(props) {
  const [token, setToken] = useState('');
  const tokenValid = checkToken(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenValid) {
      getToken();
      setToken(window.localStorage.getItem('token'));
      navigate('');
    }
  }, [token, tokenValid, navigate]);

  return (
    <div className="main">
      <Header token={token} tokenValid={tokenValid} />

      <div className="main__container">
        <p>Taylor your day swiftly by answering some questions to create a unique soundtrack to match your mood for the day.</p>

        <div className="main__content-wrapper">
          {!tokenValid ?
            <a className="button" href={LOGIN_URL}>
              Login to Spotify
            </a>
          : <Form /> }
        </div>
      </div>
    </div>
  );
}

export default App;
