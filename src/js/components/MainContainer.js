import PropTypes from 'prop-types';
import Footer from './Footer';
import Header from './Header';
import { UserDataContextProvider } from '../contextProviders/UserDataContext';

import '../../scss/components/main-container.scss';

const MainContainer = ({ children }) => {
  return (
    <UserDataContextProvider>
      <div className="main">
        <Header />

        <div className="main__container">
          <p>
            Taylor your daily soundtrack by swiftly answering some questions to create a unique
            playlist to match your mood and activities planned for the day.
          </p>

          <div className="main__content-wrapper">{children}</div>
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
