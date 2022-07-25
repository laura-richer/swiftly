import { useContext } from 'react';
import { UserDataContext } from '../contextProviders/UserDataContext';

import '../../scss/molecules/header.scss';

const Header = () => {
  const userData = useContext(UserDataContext);
  const { userName, userImage } = userData || {};

  return (
    <header className="header">
      <div className="header__container">
        <h1>SwiftLY.</h1>
        {userData && (
          <div className="header__user-data">
            <h4>
              Hi there
              <br />
              {userName}
            </h4>
            <img src={userImage} alt={userName} className="header__image" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
