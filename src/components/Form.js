import { useEffect, useState } from 'react';
import questions from '../json/questions.json';

import Button from '../atoms/Button.js';



const Form = () => {
  const [questionId, setQuestionId] = useState(1);
  const [choiceId, setChoiceId] = useState(1);
  const [nextQuestionId, setNextQuestionId] = useState();

  let currentQuestion = questions.find(question => question.id === questionId);

  const updateChoice = (choice) => {
    setChoiceId(choice);
    setNextQuestionId(getNextQuestionId(currentQuestion, choiceId));
  }

  const getNextQuestionId = (currentQuestion, choiceId) => {
    return currentQuestion.choices.find(choice => choice.id === choiceId).next_question;
  }

  const handleNext = (nextQuestionId) => {
    console.log(nextQuestionId);
    setQuestionId(nextQuestionId);
  }

  // const updateQuestion = (questionId) => {
  //   currentQuestion = questions.find(question => question.id === questionId);
  // }

  useEffect(() => {
    updateChoice(questionId);
  }, [questionId, nextQuestionId, choiceId]);

  // TODO click on radio button store next question id
  // click next - go to next question & save choice value, update currentQuestionId, reset currentChoiceIndex to 0
  // click reset - reset everything and go back to first page

  return (
    <div>
      <form className="form">
        <label className="form__label">{currentQuestion.label}</label>
        <fieldset id={`question-${questionId}`}>
          {currentQuestion.choices.map((choice, index) =>
            <div key={choice.id}>
              <label>{choice.label}</label>
              <input
                key={choice.id}
                type="radio"
                value={choice.value}
                name={`question-${questionId}`}
                defaultChecked={choiceId === index + 1}
                onChange={() => updateChoice(index + 1)}
              />
            </div>
          )}
        </fieldset>
      </form>
      <div className="form__footer">
        <Button text="reset"/>
        <Button type="button" onClick={() => handleNext(nextQuestionId)} text="next"/>
      </div>
    </div>
  );
}

export default Form;
