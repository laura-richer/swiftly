import {useEffect, useState} from 'react';
import { fetchUserData } from '../utils/api-calls.js';

const Header = (props) => {
  const [userData, setUserData] = useState({});
  const { token } = props;

  useEffect(() => {
    if(token) {
      fetchUserData().then(response => {
        setUserData(response);
      }).catch(error => {
        console.log(error);
      });
    }
  }, [token]);

  return (
    <header className="header">
      <h1>SwiftLY</h1>
      {token &&
        <div className="header__user-info">
          <h4>{userData.display_name}</h4>
          <img src={userData.images?.[0].url} alt={userData.display_name} className="header__image" />
        </div>
      }
    </header>
  )
}

export default Header;
