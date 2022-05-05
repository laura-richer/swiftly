const Button = ({type, text, btnStyle, onClick}) => {
  return <button type={type} onClick={onClick} className={`btn btn--${btnStyle}`}>{text}</button>
}
Button.defaultProps = {
  text: 'Click me',
  btnStyle: 'primary',
}

export default Button;
