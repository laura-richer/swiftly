import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { getToken, checkToken } from './utils/token.js';
import { fetchUserData } from './utils/api-calls.js';
import * as ls from './utils/local-storage.js';
import { LOGIN_URL } from './utils/vars.js';

import MainContainer from './components/MainContainer.js';
import Quiz from './components/Quiz.js';
import GenerateResults from './components/GenerateResults.js';
import YourPlaylist from './components/YourPlaylist.js';

import './scss/app.scss';

function App() {
  const [token, setToken] = useState(ls.getItem('token') || null);
  const tokenExpires = ls.getItem('tokenExpires') || null
  const tokenValid = checkToken(token, tokenExpires);
  const navigate = useNavigate();

  // TODO scope css to components rather than load all in globally
  // TODO unit tests
  // TODO try/catch error handling
  // TODO fix login???
  // TODO check category ids
  // TODO set up linting

  useEffect(() => {
    if (!tokenValid) {
      // Reset app if any data has been stored or progress saved
      ls.removeItem('userData');
      ls.resetProgress();

      // Get new token and crack on
      setToken(getToken());
      navigate('/');
    }

    if (token && tokenValid) {
      fetchUserData(token).then(response => {
        ls.setItem('userData', JSON.stringify(response));
      }).catch(error => {
        console.log(error);
      });
    }
  }, [tokenValid, token, navigate]);

  return (
    <MainContainer>
      {!tokenValid ?
        <a className="btn" href={LOGIN_URL}>
          Login to Spotify
        </a>
      : <Routes>
          <Route path="/" element={<Quiz/>} />
          <Route path="/get-soundtrack" element={<GenerateResults token={token}/>} />
          <Route path="/your-playlist" element={<YourPlaylist token={token} />} />
        </Routes>
      }
    </MainContainer>
  );
}

export default App;
