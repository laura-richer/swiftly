import PropTypes from 'prop-types';
import RadioButton from '../atoms/RadioButton';

const Form = ({ question, activeId }) => {
  return (
    <form className="form">
      <label className="form__label">{question.label}</label>
      <div id={`question-${question.id}`}>
        {question.choices.map(choice => (
          <RadioButton key={choice.id} question={question} choice={choice} activeId={activeId} />
        ))}
      </div>
    </form>
  );
};

Form.propTypes = {
  question: PropTypes.object.isRequired,
  activeId: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Form;
