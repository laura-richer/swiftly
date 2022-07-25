import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { LOGIN_URL } from './utils/variables';

import { LoginContextProvider } from './contextProviders/LoginContext';
import MainContainer from './organisims/MainContainer';

import Quiz from './pages/Quiz';
import GetSoundtrack from './pages/GetSoundtrack';
import YourSoundtrack from './pages/YourSoundtrack';

const App = () => {
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    if (!accessToken) setAccessToken(Cookies.get('accessToken'));
  }, [accessToken]);

  return (
    <LoginContextProvider>
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
