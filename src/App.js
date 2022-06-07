import { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { LOGIN_URL } from './utils/vars.js';
import { resetCurrentProgress } from './utils/local-storage.js';

import Quiz from './pages/Quiz.js';
import GetSoundtrack from './pages/GetSoundtrack.js';
import YourSoundtrack from './pages/YourSoundtrack.js';
import MainContainer from './components/MainContainer.js';

import './scss/app.scss';

export const getAccessToken = (loginCallbackUrl) => {
  if (!loginCallbackUrl) return;

  const accessToken = loginCallbackUrl.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
  const maxAge = loginCallbackUrl.substring(1).split("&").find(elem => elem.startsWith("expires_in")).split("=")[1];

  return { accessToken, maxAge };
}

function App() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['accessToken']);
  const loginCallbackUrl = window.location?.hash;

  const processLogin = (loginCallbackUrl) => {
    try {
      resetCurrentProgress();

      const {accessToken, maxAge} = getAccessToken(loginCallbackUrl);
      setCookie('accessToken', accessToken, {
        maxAge,
      });
      navigate('/');
    } catch(error) {
      console.log(error);
      throw error;
    }
  }

  useEffect(() => {
    if (loginCallbackUrl && !cookies.accessToken) processLogin(loginCallbackUrl);
  }, [navigate, loginCallbackUrl, cookies]);

  return (
    <MainContainer>
      {!cookies.accessToken ?
        <a className="btn" href={LOGIN_URL}>
          Login to Spotify
        </a>
      : <Routes>
          <Route path="/" element={<Quiz/>} />
          <Route path="/get-soundtrack" element={<GetSoundtrack/>} />
          <Route path="/your-soundtrack/:playlistId" element={<YourSoundtrack/>} />
        </Routes>
      }
    </MainContainer>
  );
}

export default App;
