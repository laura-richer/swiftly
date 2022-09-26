import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../molecules/Footer';
import Header from '../molecules/Header';
import { UserDataContextProvider } from '../contextProviders/UserDataContext';

import '../../scss/organisims/main-container.scss';

const MainContainer = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <UserDataContextProvider>
      <div className="main">
        <Header />

        <div className="main__container">
          <p className={`main__introduction ${isLoaded && 'main__introduction--animate-in'}`}>
            Taylor your daily soundtrack by swiftly answering some questions to create a unique
            playlist to match your mood and activities planned for the day.
          </p>

          <div
            className={`main__content-wrapper ${isLoaded && 'main__content-wrapper--animate-in'}`}
          >
            {children}
          </div>
        </div>

        <Footer />
      </div>
    </UserDataContextProvider>
  );
};

MainContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContainer;
