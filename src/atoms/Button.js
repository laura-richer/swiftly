const Button = ({type, text, onClick}) => {
  return <button type={type} onClick={onClick} >{text}</button>
}
Button.defaultProps = {
  text: 'Click me',
}

export default Button;
