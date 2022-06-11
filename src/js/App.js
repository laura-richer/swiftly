import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { LOGIN_URL } from './utils/variables';

import { LoginContextProvider } from './contextProviders/LoginContext';
import MainContainer from './components/MainContainer';

import Quiz from './views/Quiz';
import GetSoundtrack from './views/GetSoundtrack';
import YourSoundtrack from './views/YourSoundtrack';

const App = () => {
  const [accessToken, setAccessToken] = useState();
  const loginCallbackUrl = window.location?.hash;

  useEffect(() => {
    if (!accessToken) setAccessToken(Cookies.get('accessToken'));
  }, [accessToken]);

  return (
    <LoginContextProvider callbackUrl={loginCallbackUrl}>
      <MainContainer>
        {!accessToken ? (
          <a className="btn" href={LOGIN_URL}>
            Login to Spotify
          </a>
        ) : (
          <Routes>
            <Route path="/" element={<Quiz />} />
            <Route path="/get-soundtrack" element={<GetSoundtrack />} />
            <Route path="/your-soundtrack/:playlistId" element={<YourSoundtrack />} />
          </Routes>
        )}
      </MainContainer>
    </LoginContextProvider>
  );
};

export default App;
