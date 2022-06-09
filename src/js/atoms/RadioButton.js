import PropTypes from 'prop-types';

const RadioButton = ({ question, choice, activeId, onChange }) => {
  return (
    <label className="radio-btn" key={choice.id}>
      <input
        className="radio-btn__input"
        key={choice.id}
        type="radio"
        value={choice.value}
        name={`question-${question.id}`}
        checked={activeId === choice.id ? 'checked' : ''}
        onChange={() => onChange(question, choice.id)}
      />
      <span className="radio-btn__indicator"></span>
      <p>{choice.label}</p>
    </label>
  );
};

RadioButton.propTypes = {
  question: PropTypes.object.isRequired,
  choice: PropTypes.object.isRequired,
  activeId: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RadioButton;
