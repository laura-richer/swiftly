import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { resetCurrentProgress } from '../utils/local-storage';

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

  Cookies.set('accessToken', accessToken, { 'max-age': maxAge });
  return accessToken;
};

const LoginContext = createContext();

const LoginContextProvider = ({ children, callbackUrl }) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(Cookies.get('accessToken'));

  const processLogin = url => {
    try {
      resetCurrentProgress();
      setAccessToken(getAccessToken(url));
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (callbackUrl && !accessToken) processLogin(callbackUrl);
  }, [callbackUrl, accessToken]);

  return <LoginContext.Provider value={accessToken}>{children}</LoginContext.Provider>;
};

LoginContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  callbackUrl: PropTypes.string,
};

export { LoginContext, LoginContextProvider };
