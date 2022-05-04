const Button = ({type, text}) => {
  return <button type={type} >{text}</button>
}
Button.defaultProps = {
  text: 'Click me',
}

export default Button;
