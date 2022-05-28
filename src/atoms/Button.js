const Button = ({tag, link, target, text, btnStyle, onClick, disabled}) => {
  if (tag === 'a') return <a href={link} target={target} className={`btn btn--${btnStyle}`}>{text}</a>

  return <button disabled={disabled} onClick={onClick} className={`btn btn--${btnStyle}`}>{text}</button>
}
Button.defaultProps = {
  text: 'Click me',
  btnStyle: 'primary',
}

export default Button;
