import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { fetchUserData } from '../utils/api-calls.js';

const UserDataContext = createContext();

const UserDataContextProvider = ({children}) => {
  const [cookies] = useCookies(['token']);
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (cookies.token) {
      fetchUserData(cookies.token).then(response => {
        setUserData({
          name: response.display_name,
          image: response.images[0].url,
          id: response.id,
        });
      }).catch(error => {
        console.log(error);
      });
    }
  }, [cookies.token]);

  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataContext, UserDataContextProvider };
