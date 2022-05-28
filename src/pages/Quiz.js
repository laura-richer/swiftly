import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as ls from '../utils/local-storage.js';
import questions from '../json/questions.json';

import Button from '../atoms/Button.js';
import Form from '../components/Form.js';

const getQuestion = (questionId) => questions.find(question => question.id === questionId);
const getChoice = (question, choiceId) => question.choices.find(choice => choice.id === choiceId);

const Quiz = () => {
  const navigate = useNavigate();
  const savedQuestionId = Number(ls.getItem('currentQuestionId'));
  const savedChoiceId = Number(ls.getItem('currentChoiceId'));

  const [questionId, setQuestionId] = useState(savedQuestionId || 1);
  const [choiceId, setChoiceId] = useState(savedChoiceId || 1);

  let question = getQuestion(questionId);
  let nextQuestionId = getChoice(question, choiceId).next_question;

  const handleNext = (id: Number, choiceId: Number) => {
    // If theres no more questions, get soundtrack
    if (!id) {
      navigate('/get-soundtrack');
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
    ls.resetProgress();

    // Reset question & to initial values
    setQuestionId(1);
    setChoiceId(1);
  }

  return (
    <div className="quiz">
      <Form question={question} activeId={choiceId} onChange={updateChoice}/>
      <div className="quiz__footer">
        <Button btnStyle="secondary" text="Start over" onClick={handleReset} disabled={!savedQuestionId}/>
        <Button text={!nextQuestionId ? 'Get your soundtrack' : 'Next'} onClick={() => handleNext(nextQuestionId, choiceId)}/>
      </div>
    </div>
  )
}

export default Quiz;
