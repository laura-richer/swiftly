import { useEffect, useState } from 'react';
import { getItem } from '../utils/local-storage.js';

import ghost from '../assets/images/ghost.png';

const getUserData = async () => {
  console.log('testng');
  const data = await getItem('userData');
  return data;
}

const Header = () => {
  // TODO fix this!
  const userData = JSON.parse(getItem('userData'));
  const [name, setName] = useState(userData?.display_name || 'Stranger');
  const [image, setImage] = useState(userData?.images[0].url || ghost);

  useEffect(() => {
    if (!userData) {
      getUserData().then(response => {
        console.log(response);
      });
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
