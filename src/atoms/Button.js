const Button = ({text}) => {
  return <button>{text}</button>
}
Button.defaultProps = {
  text: 'Click me',
}

export default Button;
