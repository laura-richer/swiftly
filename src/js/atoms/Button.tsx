import PropTypes from 'prop-types';

type ButtonProperties = {
  tag?: string;
  link?: string;
  target?: string;
  text: string;
  btnStyle: string;
  onClick: () => void;
  disabled?: boolean;
};

const Button = ({ tag, link, target, text, btnStyle, onClick, disabled }: ButtonProperties) => {
  if (tag === 'a')
    return (
      <a href={link} target={target} className={`btn btn--${btnStyle}`}>
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
