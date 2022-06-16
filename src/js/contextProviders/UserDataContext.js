import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchUserData } from '../utils/api-calls';
import { LoginContext } from './LoginContext';
import guestUser from '../../assets/images/ghost.png';

const UserDataContext = createContext();

const UserDataContextProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const isLoggedIn = useContext(LoginContext);

  useEffect(() => {
    if (!isLoggedIn) {
      setUserData({
        userName: 'Stranger',
        userImage: guestUser,
        id: 'stranger',
      });
    }

    if (isLoggedIn) {
      fetchUserData()
        .then(response => {
          setUserData({
            userName: response.display_name,
            userImage: response.images?.[0].url ? response.images?.[0].url : guestUser,
            id: response.id,
          });
        })
        .catch(error => {
          console.error(error, 'error fetching user data');
        });
    }
  }, [isLoggedIn]);

  return <UserDataContext.Provider value={userData}>{children}</UserDataContext.Provider>;
};

UserDataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserDataContext, UserDataContextProvider };
