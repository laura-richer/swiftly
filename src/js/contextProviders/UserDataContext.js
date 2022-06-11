import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchUserData } from '../utils/api-calls';
import { LoginContext } from './LoginContext';

const UserDataContext = createContext();

const UserDataContextProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const isLoggedIn = useContext(LoginContext);

  useEffect(() => {
    if (isLoggedIn) {
      try {
        fetchUserData()
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
  }, [isLoggedIn]);

  return <UserDataContext.Provider value={userData}>{children}</UserDataContext.Provider>;
};

UserDataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserDataContext, UserDataContextProvider };
