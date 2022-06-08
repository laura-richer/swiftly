import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
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
            console.log(error);
          });
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }, [cookies.accessToken]);

  return <UserDataContext.Provider value={userData}>{children}</UserDataContext.Provider>;
};

export { UserDataContext, UserDataContextProvider };
