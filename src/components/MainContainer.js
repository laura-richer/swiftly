import Header from './Header.js';

const MainContainer = ({token, tokenValid, children}) => {
  return (
    <div className="main">
      <Header token={token} tokenValid={tokenValid} />

      <div className="main__container">
        <p>
          Taylor your daily soundtrack by swiftly answering some questions to create a unique playlist to match your mood and activities planned for the day.
        </p>

        <div className="main__content-wrapper">
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainContainer;
