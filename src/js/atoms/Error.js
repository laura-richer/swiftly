import PropTypes from 'prop-types';

import '../../scss/atoms/error.scss';

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
