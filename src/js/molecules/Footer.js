import spotifyLogo from '../../assets/images/spotify-logo.png';

import '../../scss/molecules/footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <a href="https://www.spotify.com" target="_blank" className="footer__link" rel="noreferrer">
        <span>Powered by</span>
        <img src={spotifyLogo} alt="Powered by Spotify" className="footer__img" />
      </a>
    </footer>
  );
};

export default Footer;
