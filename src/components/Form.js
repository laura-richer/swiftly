const Form = ({question, choiceId, onChange}) => {
  return (
    <form className="form">
      <label className="form__label">{question.label}</label>
      <fieldset id={`question-${question.id}`}>
        {question.choices.map((choice, index) =>
          <div key={choice.id}>
            <label>{choice.label}</label>
            <input
              key={choice.id}
              type="radio"
              value={choice.value}
              name={`question-${question.id}`}
              checked={choiceId === choice.id}
              onChange={() => onChange(question, choice.id)}
            />
          </div>
        )}
      </fieldset>
    </form>
  );
}

export default Form;
