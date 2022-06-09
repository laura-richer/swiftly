import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import { fetchUserData } from '../utils/api-calls';

const UserDataContext = createContext();

const UserDataContextProvider = ({ children }) => {
  const [cookies] = useCookies(['accessToken']);
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (cookies.accessToken) {
      try {
        fetchUserData(cookies.accessToken)
          .then(response => {
            setUserData({
              name: response.display_name,
              image: response.images[0].url,
              id: response.id,
            });
          })
          .catch(error => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }, [cookies.accessToken]);

  return <UserDataContext.Provider value={userData}>{children}</UserDataContext.Provider>;
};

UserDataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserDataContext, UserDataContextProvider };
