import PropTypes from 'prop-types';

import '../../scss/atoms/btn.scss';

const Button = ({ tag, link, target, text, btnStyle, onClick, disabled }) => {
  if (tag === 'a')
    return (
      <a
        href={link}
        target={target}
        className={`btn btn--${btnStyle} ${disabled ? 'btn--disabled' : ''}`}
      >
        {text}
      </a>
    );

  return (
    <button disabled={disabled} onClick={onClick} className={`btn btn--${btnStyle}`}>
      {text}
    </button>
  );
};

Button.propTypes = {
  tag: PropTypes.string,
  link: PropTypes.string,
  target: PropTypes.string,
  text: PropTypes.string,
  btnStyle: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  btnStyle: 'primary',
  text: 'Click me',
};

export default Button;
