import { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { LOGIN_URL } from './utils/vars.js';
import { resetProgress } from './utils/local-storage.js';

import Quiz from './pages/Quiz.js';
import GetSoundtrack from './pages/GetSoundtrack.js';
import YourSoundtrack from './pages/YourSoundtrack.js';
import MainContainer from './components/MainContainer.js';

import './scss/app.scss';

  // JS & performance
  // TODO scope css to components rather than load all in globally
  // TODO set up linting
  // TODO unit tests
  // TODO try/catch error handling
  // TODO check category ids
  // TODO move process login stuff to HOC? Wrapper component?

  // Styling
  // TODO button hover states
  // TODO secondary button styles
  // TODO mobile button styles on get soundtrack page
  // TODO lazy loading on images
  // TODO animation

const getToken = (hash) => {
  if (!hash) return;

  const token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
  const maxAge = hash.substring(1).split("&").find(elem => elem.startsWith("expires_in")).split("=")[1];

  return { token, maxAge };
}

function App() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token']);
  const hash = window.location?.hash;

  const processLogin = (hash) => {
    // Reset any current progress
    resetProgress();

    // Get and set new token and crack on
    const {token, maxAge} = getToken(hash);
    setCookie('token', token, {
      maxAge,
    });
    navigate('/');
  }

  useEffect(() => {
    if (hash && !cookies.token) processLogin(hash);
  }, [navigate, hash, cookies]);

  return (
    <MainContainer>
      {!cookies.token ?
        <a className="btn" href={LOGIN_URL}>
          Login to Spotify
        </a>
      : <Routes>
          <Route path="/" element={<Quiz/>} />
          <Route path="/get-soundtrack" element={<GetSoundtrack token={cookies.token}/>} />
          <Route path="/your-soundtrack/:playlistId" element={<YourSoundtrack token={cookies.token} />} />
        </Routes>
      }
    </MainContainer>
  );
}

export default App;
