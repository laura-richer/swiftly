import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { resetCurrentProgress } from '../utils/local-storage';

const getAccessToken = url => {
  if (!url) return;
  try {
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

    Cookies.set('accessToken', accessToken, { 'max-age': maxAge });
    return accessToken;
  } catch (error) {
    console.error(error, 'Cant process access token');
  }
};

const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(Cookies.get('accessToken'));
  const loginCallbackUrl = window.location?.hash;

  const processLogin = url => {
    resetCurrentProgress();
    setAccessToken(getAccessToken(url));
    navigate('/');
  };

  useEffect(() => {
    if (loginCallbackUrl && !accessToken) processLogin(loginCallbackUrl);
  }, [loginCallbackUrl, accessToken]);

  return <LoginContext.Provider value={accessToken}>{children}</LoginContext.Provider>;
};

LoginContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  callbackUrl: PropTypes.string,
};

export { LoginContext, LoginContextProvider };
