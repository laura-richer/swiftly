import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { LOGIN_URL } from './utils/variables';
import { resetCurrentProgress } from './utils/local-storage';

import Quiz from './pages/Quiz';
import GetSoundtrack from './pages/GetSoundtrack';
import YourSoundtrack from './pages/YourSoundtrack';
import MainContainer from './components/MainContainer';

export const getAccessToken = loginCallbackUrl => {
  if (!loginCallbackUrl) return;

  const accessToken = loginCallbackUrl
    .slice(1)
    .split('&')
    .find(element => element.startsWith('access_token'))
    .split('=')[1];
  const maxAge = loginCallbackUrl
    .slice(1)
    .split('&')
    .find(element => element.startsWith('expires_in'))
    .split('=')[1];

  return { accessToken, maxAge };
};

function App() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['accessToken']);
  const loginCallbackUrl = window.location?.hash;

  const processLogin = loginCallbackUrl => {
    try {
      resetCurrentProgress();

      const { accessToken, maxAge } = getAccessToken(loginCallbackUrl);
      setCookie('accessToken', accessToken, {
        maxAge,
      });
      navigate('/');
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    if (loginCallbackUrl && !cookies.accessToken) processLogin(loginCallbackUrl);
  }, [navigate, loginCallbackUrl, cookies]);

  return (
    <MainContainer>
      {!cookies.accessToken ? (
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
  );
}

export default App;
