import { useEffect, useState, useContext } from 'react';
import { UserDataContext } from './UserDataContext.js';
import ghost from '../assets/images/ghost.png';

const Header = () => {
  const [name, setName] = useState('Stranger');
  const [image, setImage] = useState(ghost);
  const userData = useContext(UserDataContext);

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setImage(userData.image);
    }
  }, [userData])

  return (
      <header className="header">
        <div className="header__container">
          <h1>SwiftLY.</h1>
          <div className="header__user-data">
            <h4>Hi there<br/>{name}</h4>
            <img src={image} alt={name} className="header__image" />
          </div>
        </div>
      </header>
  )
}

export default Header;
