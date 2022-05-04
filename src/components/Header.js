import {useEffect, useState} from 'react';
import { fetchUserData } from '../utils/api-calls.js';

import ghost from '../assets/images/ghost.png';

const Header = ({token, tokenValid}) => {
  const [name, setName] = useState('Stranger');
  const [image, setImage] = useState(ghost);

  useEffect(() => {
    if(token && tokenValid) {
      fetchUserData(token).then(response => {
        setName(response.display_name);
        setImage(response.images?.[0].url);
      }).catch(error => {
        console.log(error);
      });
    }
  }, [token, tokenValid]);

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
