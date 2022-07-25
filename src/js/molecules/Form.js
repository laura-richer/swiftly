import PropTypes from 'prop-types';
import RadioButton from '../atoms/RadioButton';

import '../../scss/molecules/form.scss';

const Form = ({ question, activeId, onChange }) => {
  return (
    <form className="form">
      <label className="form__label">{question.label}</label>
      <div id={`question-${question.id}`} className="form__group">
        {question.choices.map(choice => (
          <RadioButton
            key={choice.id}
            question={question}
            choice={choice}
            activeId={activeId}
            onChange={() => onChange(question, choice.id)}
          />
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
