import { useEffect, useState } from 'react';
import questions from '../json/questions.json';

import Button from '../atoms/Button.js';

const getQuestion = (questionId) => {
  return questions.find(question => question.id === questionId);
}

const getNextQuestionId = (question, choiceId) => {
  return question.choices.find(choice => choice.id === choiceId).next_question;
}

const Form = () => {
  const [questionId, setQuestionId] = useState(1);
  const [choiceId, setChoiceId] = useState(1);

  let question = getQuestion(questionId);
  let nextQuestionId;

  const handleNext = (nextQuestionId) => {
    setQuestionId(nextQuestionId);
    setChoiceId(1);
    // store question id to local storage
  }

  useEffect(() => {
    // if local storage for question id exists set as current question id & current question
    question = getQuestion(questionId);
    nextQuestionId = getNextQuestionId(question, choiceId);
  }, [questionId]);

  useEffect(() => {
    nextQuestionId = getNextQuestionId(question, choiceId);
  }, [choiceId]);

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
                onChange={() => setChoiceId(choice.id)}
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
