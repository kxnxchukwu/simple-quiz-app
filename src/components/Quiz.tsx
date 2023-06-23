import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Questions from "./Questions";

export const Quiz = (): React.ReactElement => {
  const questions = useSelector((state: RootState) => state.quiz.questions);
  const currentQuestionIndex = useSelector(
    (state: RootState) => state.quiz.currentQuestionIndex
  );
  const userAnswers = useSelector((state: RootState) => state.quiz.userAnswers);
  const isQuizOver = useSelector((state: RootState) => state.quiz.isQuizOver);
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Questions
      currentQuestion={currentQuestion}
      userAnswers={userAnswers}
      isQuizOver={isQuizOver}
    />
  );
};
