import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { resetCurrentProgress } from '../utils/local-storage';
import { buildLoginUrl, TOKEN_ENDPOINT } from '../utils/variables';

const generateCodeVerifier = () => {
  const array = new Uint8Array(64);
  crypto.getRandomValues(array);
  return btoa(String.fromCodePoint(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const generateCodeChallenge = async verifier => {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCodePoint(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const exchangeCodeForToken = async code => {
  const verifier = sessionStorage.getItem('pkce_verifier');
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    client_id: process.env.REACT_APP_CLIENT_ID,
    code_verifier: verifier,
  });

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!response.ok) throw new Error('Failed to exchange code for token');

  const data = await response.json();
  Cookies.set('accessToken', data.access_token, { expires: data.expires_in / 86_400 });
  sessionStorage.removeItem('pkce_verifier');
  return data.access_token;
};

const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(Cookies.get('accessToken'));
  const searchParameters = new URLSearchParams(window.location.search);
  const code = searchParameters.get('code');

  useEffect(() => {
    if (code && !accessToken) {
      resetCurrentProgress();
      exchangeCodeForToken(code)
        .then(token => {
          setAccessToken(token);
          navigate('/');
        })
        .catch(error => console.error('Login failed', error));
    }
  }, [code, accessToken, navigate]);

  const initiateLogin = async () => {
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    sessionStorage.setItem('pkce_verifier', verifier);
    window.location.href = buildLoginUrl(challenge);
  };

  return (
    <LoginContext.Provider value={{ accessToken, initiateLogin }}>{children}</LoginContext.Provider>
  );
};

LoginContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LoginContext, LoginContextProvider };
