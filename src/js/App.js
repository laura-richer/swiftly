import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { LOGIN_URL } from './utils/variables';
import { resetCurrentProgress } from './utils/local-storage';

import Quiz from './pages/Quiz';
import GetSoundtrack from './pages/GetSoundtrack';
import YourSoundtrack from './pages/YourSoundtrack';
import MainContainer from './components/MainContainer';

const getAccessToken = url => {
  if (!url) return;

  const accessToken = url
    .slice(1)
    .split('&')
    .find(element => element.startsWith('access_token'))
    .split('=')[1];
  const maxAge = url
    .slice(1)
    .split('&')
    .find(element => element.startsWith('expires_in'))
    .split('=')[1];

  return { accessToken, maxAge };
};

const App = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['accessToken']);
  const loginCallbackUrl = window.location?.hash;

  const processLogin = url => {
    try {
      resetCurrentProgress();

      const { accessToken, maxAge } = getAccessToken(url);
      setCookie('accessToken', accessToken, {
        maxAge,
      });
      navigate('/');
    } catch (error) {
      console.error(error);
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
};

export default App;
