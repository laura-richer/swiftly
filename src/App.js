import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { getToken, checkToken } from './utils/token.js';
import { getItem, removeItem } from './utils/local-storage.js';
import { LOGIN_URL } from './utils/vars.js';

import MainContainer from './components/MainContainer.js';
import Quiz from './components/Quiz.js';
import GenerateResults from './components/GenerateResults.js';

import './scss/app.scss';

function App() {
  const [token, setToken] = useState(getItem('token') || null);
  const tokenExpires = getItem('tokenExpires') || null
  const tokenValid = checkToken(token, tokenExpires);
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenValid) {
      // Reset progress
      removeItem('currentQuestionId');
      removeItem('currentChoiceId');
      removeItem('answers');

      setToken(getToken());
      navigate('');
    }
  }, [tokenValid, token, navigate]);

  return (
    <MainContainer token={token} tokenValid={tokenValid}>
      {!tokenValid ?
        <a className="btn" href={LOGIN_URL}>
          Login to Spotify
        </a>
      : <Routes>
          <Route path="" element={<Quiz/>} />
          <Route path="/get-soundtrack" element={<GenerateResults token={token}/>} />
        </Routes>
      }
    </MainContainer>
  );
}

export default App;
