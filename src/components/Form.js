import { useState } from 'react';
import * as ls from '../utils/local-storage.js';
import questions from '../json/questions.json';
import Button from '../atoms/Button.js';

const getQuestion = (questionId) => {
  return questions.find(question => question.id === questionId);
}

const getChoice = (question, choiceId) => {
  return question.choices.find(choice => choice.id === choiceId);
}

const Form = () => {
  const savedQuestionId = Number(ls.getItem('currentQuestionId'));
  const savedChoiceId = Number(ls.getItem('currentChoiceId'));

  const [questionId, setQuestionId] = useState(savedQuestionId || 1);
  const [choiceId, setChoiceId] = useState(savedChoiceId || 1);

  let question = getQuestion(questionId);
  let nextQuestionId = getChoice(question, choiceId).next_question;

  const handleNext = (id: Number, choiceId: Number) => {
    // If theres no more questions, get soundtrack
    if (!id) {
      console.log('get soundtrack');
      // TODO go to generate soundtrack page
      return;
    };

    // Save progress
    ls.setItem('currentQuestionId', id);

    // Add choice value to answers
    updateAnswers(question, choiceId);

    // Get next question
    setQuestionId(id);
    question = getQuestion(id);

    // Set initial choice id
    updateChoice(question, 1);
  }

  const updateChoice = (question: Object, id: Number) => {
    // Save current choice
    ls.setItem('currentChoiceId', id);

    // Update choice id and get next question id
    setChoiceId(id);
    nextQuestionId = getChoice(question, id).next_question;
  }

  const updateAnswers = (question: Object, choiceId: Number) => {
    const answers = JSON.parse(ls.getItem('answers')) || [];
    answers.push(getChoice(question, choiceId).value);
    ls.setItem('answers', JSON.stringify(answers));
  }

  const handleReset = () => {
    // Reset progress
    ls.removeItem('currentQuestionId');
    ls.removeItem('currentChoiceId');
    ls.removeItem('answers');

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
                onChange={() => updateChoice(question, choice.id)}
              />
            </div>
          )}
        </fieldset>
      </form>
      <div className="form__footer">
        <Button btnStyle="secondary" text="Reset" onClick={() => handleReset()}/>
        <Button text={!nextQuestionId ? 'Get your soundtrack' : 'Next'} onClick={() => handleNext(nextQuestionId, choiceId)}/>
      </div>
    </div>
  );
}

export default Form;
