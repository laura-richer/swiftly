import { useEffect, useState, useContext } from 'react';
import { UserDataContext } from '../contextProviders/UserDataContext';
import guestUser from '../../assets/images/ghost.png';

const Header = () => {
  const [userName, setUserName] = useState('Stranger');
  const [userImage, setUserImage] = useState(guestUser);
  const userData = useContext(UserDataContext);

  useEffect(() => {
    if (userData) {
      setUserName(userData.name);
      setUserImage(userData.image);
    }
  }, [userData]);

  return (
    <header className="header">
      <div className="header__container">
        <h1>SwiftLY.</h1>
        <div className="header__user-data">
          <h4>
            Hi there
            <br />
            {userName}
          </h4>
          <img src={userImage} alt={userName} className="header__image" />
        </div>
      </div>
    </header>
  );
};

export default Header;
