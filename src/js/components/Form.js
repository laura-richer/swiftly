import RadioButton from '../atoms/RadioButton';

const Form = ({ question, activeId, onChange }) => {
  return (
    <form className="form">
      <label className="form__label">{question.label}</label>
      <div id={`question-${question.id}`}>
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

export default Form;
