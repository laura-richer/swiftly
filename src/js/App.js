import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginContext, LoginContextProvider } from './contextProviders/LoginContext';

import MainContainer from './organisims/MainContainer';

import Quiz from './pages/Quiz';
import GetSoundtrack from './pages/GetSoundtrack';
import YourSoundtrack from './pages/YourSoundtrack';

const AppRoutes = () => {
  const { accessToken, initiateLogin } = useContext(LoginContext);

  return (
    <MainContainer>
      {!accessToken ? (
        <button className="btn" onClick={initiateLogin}>
          Login to Spotify
        </button>
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

const App = () => (
  <LoginContextProvider>
    <AppRoutes />
  </LoginContextProvider>
);

export default App;
