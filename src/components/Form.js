import { useEffect, useState } from 'react';
import questions from '../json/questions.json';

import Button from '../atoms/Button.js';

const Form = () => {
  const [questionId, setQuestionId] = useState(1);
  const [question, setQuestion] = useState(questions[0]);
  const [choiceId, setChoiceId] = useState(1);
  const [nextQuestionId, setNextQuestionId] = useState();

  const getQuestion = (questionId) => {
    return questions.find(question => question.id === questionId);
  }

   const updateChoice = (choice) => {
    setChoiceId(choice);
  }

  const getNextQuestionId = (question, choiceId) => {
    return question.choices.find(choice => choice.id === choiceId).next_question;
  }

  const handleNext = (nextQuestionId) => {
    console.log('testing');
    setQuestionId(nextQuestionId);
    // store question id to local storage
  }

  useEffect(() => {
    // if local storage for question id exists set as current question id & current question
    setQuestion(getQuestion(questionId));
    setChoiceId(1);
    setNextQuestionId(getNextQuestionId(question, choiceId));

    console.log('updated question id')
    console.log(questionId, 'question id');
    console.log(choiceId, 'choice id');
    console.log(nextQuestionId, 'next question id')
  }, [questionId]);

  useEffect(() => {
    setNextQuestionId(getNextQuestionId(question, choiceId));
    console.log('updated choice');
    console.log(nextQuestionId, 'next question id');
  }, [choiceId]);

  return (
    <div>
      {choiceId}
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
                defaultChecked={choiceId === index + 1}
                onChange={() => setChoiceId(index + 1)}
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
