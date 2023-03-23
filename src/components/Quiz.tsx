import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  setUserAnswer,
  nextQuestion,
  restartQuiz,
  endQuiz,
} from "../features/quiz-slice";
import Results from "./Results";
import Questions from "./Questions";

export const Quiz = (): React.ReactElement => {
  const questions = useSelector((state: RootState) => state.quiz.questions);
  const dispatch = useDispatch();
  const currentQuestionIndex = useSelector(
    (state: RootState) => state.quiz.currentQuestionIndex
  );
  const userAnswers = useSelector((state: RootState) => state.quiz.userAnswers);
  const isQuizOver = useSelector((state: RootState) => state.quiz.isQuizOver);
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (option: QuizOption) => {
    dispatch(setUserAnswer({ questionId: currentQuestion.id, option }));
  };

  const handleNextQuestionButtonClick = () => {
    if (currentQuestionIndex === questions.length - 1) {
      dispatch(endQuiz());
    } else {
      dispatch(nextQuestion());
    }
  };

  const handleRestartQuiz = () => {
    dispatch(restartQuiz());
  };

  if (isQuizOver) {
    return <Results handleRestartQuiz={handleRestartQuiz} />;
  }

  return (
    <Questions
      currentQuestion={currentQuestion}
      userAnswers={userAnswers}
      isQuizOver={isQuizOver}
      handleNextQuestionButtonClick={handleNextQuestionButtonClick}
      handleOptionClick={handleOptionClick}
    />
  );
};
