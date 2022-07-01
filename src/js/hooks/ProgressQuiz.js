import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as ls from '../utils/local-storage';
import questions from '../json/questions.json';

const getQuestion = questionId => questions.find(question => question.id === questionId);
const getChoice = (question, choiceId) => question.choices.find(choice => choice.id === choiceId);

const ProgressQuiz = () => {
  const navigate = useNavigate();
  const savedQuestionId = Number(ls.getItem('currentQuestionId'));
  const savedChoiceId = Number(ls.getItem('currentChoiceId'));

  const [questionId, setQuestionId] = useState(savedQuestionId || 1);
  const [currentChoicehoiceId, setCurrentChoiceId] = useState(savedChoiceId || 1);

  let currentQuestion = getQuestion(questionId);
  let nextQuestionId = getChoice(currentQuestion, currentChoicehoiceId).next_question;

  const updateChoice = (question, id) => {
    // Save current choice
    ls.setItem('currentChoiceId', id);

    // Update choice id and get next question id
    setCurrentChoiceId(id);
    nextQuestionId = getChoice(question, id).next_question;
  };

  const updateAnswers = (question, choiceId) => {
    const answers = JSON.parse(ls.getItem('answers')) || [];
    answers.push(getChoice(question, choiceId).value);
    ls.setItem('answers', JSON.stringify(answers));
  };

  const handleReset = () => {
    ls.resetCurrentProgress();

    // Reset question & to initial values
    setQuestionId(1);
    setCurrentChoiceId(1);
  };

  const handleNext = (id, choiceId) => {
    // Add choice value to answers
    updateAnswers(currentQuestion, choiceId);

    // If theres no more questions, get soundtrack
    if (!id) {
      navigate('/get-soundtrack');
      return;
    }

    // Save progress
    ls.setItem('currentQuestionId', id);

    // Get next question
    try {
      setQuestionId(id);
      currentQuestion = getQuestion(id);

      // Set initial choice id for new question
      updateChoice(currentQuestion, 1);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    currentQuestion,
    currentChoicehoiceId,
    nextQuestionId,
    updateChoice,
    handleReset,
    savedQuestionId,
    handleNext,
  };
};

export default { ProgressQuiz };
