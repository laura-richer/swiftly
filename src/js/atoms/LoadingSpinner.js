import '../../scss/atoms/loading-spinner.scss';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="loading-spinner__element"></div>
      <div className="loading-spinner__element"></div>
      <div className="loading-spinner__element"></div>
    </div>
  );
};

export default LoadingSpinner;
