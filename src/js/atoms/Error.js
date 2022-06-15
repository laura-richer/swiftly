import PropTypes from 'prop-types';

const Error = ({ message }) => {
  return (
    <div className="error">
      <p>{message}</p>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
