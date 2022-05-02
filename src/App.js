import {useEffect, useState} from 'react';
import { getToken, checkToken } from './utils/token.js';
import * as config from './utils/vars.js';

import Header from './components/Header.js';
import './app.scss';

function App(props) {
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokenValid = checkToken();

    if (tokenValid) {
      setToken(window.localStorage.getItem('token'));
    } else {
      setToken(getToken());
    }
  },[token]);

  return (
    <div className="App">
      <Header token={token} />
      {!token &&
        <a href={`${config.AUTH_ENDPOINT}?client_id=${config.CLIENT_ID}&redirect_uri=${config.REDIRECT_URI}&response_type=${config.RESPONSE_TYPE}`}>Login
          to Spotify</a>
      }
    </div>
  );
}

export default App;
