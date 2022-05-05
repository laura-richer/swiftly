import { useState } from 'react';
import * as ls from '../utils/local-storage.js';
import questions from '../json/questions.json';

import Button from '../atoms/Button.js';

const getQuestion = (questionId) => {
  return questions.find(question => question.id === questionId);
}

const getNextQuestionId = (question, choiceId) => {
  return question.choices.find(choice => choice.id === choiceId).next_question;
}

const Form = () => {
  const currentQuestionId = Number(ls.getItem('currentQuestionId'));
  const currentChoiceId = Number(ls.getItem('currentChoiceId'));

  const [questionId, setQuestionId] = useState(currentQuestionId || 1);
  const [choiceId, setChoiceId] = useState(currentChoiceId || 1);
  let question = getQuestion(questionId);
  let nextQuestionId = getNextQuestionId(question, choiceId);

  const handleNext = (id) => {
    // Update question
    setQuestionId(id);
    question = getQuestion(id);

    // Set initial choice id
    updateChoice(1);

    // Save progress
    ls.setItem('currentQuestionId', id);
  }

  const updateChoice = (id) => {
    // Update choice id and get next question id
    setChoiceId(id);
    nextQuestionId = getNextQuestionId(question, id);

    // Save current choice
    ls.setItem('currentChoiceId', id);
  }

  const handleReset = () => {
    // Remove progress
    ls.removeItem('currentQuestionId');
    ls.removeItem('currentChoiceId');

    // TODO clear saved answers

    // Reset question & to initial values
    setQuestionId(1);
    setChoiceId(1);
  }

  return (
    <div>
      <form className="form">
        <label className="form__label">{question.label}</label>
        <fieldset id={`question-${questionId}`}>
          {question.choices.map((choice, index) =>
            <div key={choice.id}>
              <label>{choice.label}</label>
              <input
                key={choice.id}
                type="radio"
                value={choice.value}
                name={`question-${questionId}`}
                checked={choiceId === choice.id}
                onChange={() => updateChoice(choice.id)}
              />
            </div>
          )}
        </fieldset>
      </form>
      <div className="form__footer">
        <Button type="button" text="reset" onClick={() => handleReset()}/>
        <Button type="button" text="next" onClick={() => handleNext(nextQuestionId)}/>
      </div>
    </div>
  );
}

export default Form;
