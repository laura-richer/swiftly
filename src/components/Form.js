import questions from '../json/questions.json';

import Button from '../atoms/Button.js';

const Form = () => {
  const currentQuestionId = 1;
  const currentQuestion = questions.find(question => question.id === currentQuestionId);
  const currentChoiceIndex = 0;

  // TODO click on radio button store next question id
  // click next - go to next question & save choice value, update currentQuestionId, reset currentChoiceIndex to 0
  // click reset - reset everything and go back to first page

  return (
    <form className="form">
      <label className="form__label">{currentQuestion.label}</label>

      <fieldset id={`question-${currentQuestionId}`}>
        {currentQuestion.choices.map((choice, index) =>
          <div key={choice.id}>
            <label>{choice.label}</label>
            <input
              key={choice.id}
              type="radio"
              value={choice.value}
              name={`question-${currentQuestionId}`}
              checked={currentChoiceIndex === index}
            />
          </div>
        )}
      </fieldset>

      <div className="form__footer">
        <Button text="reset"/>
        <Button text="next"/>
      </div>
    </form>
  );
}

export default Form;
