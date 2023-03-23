import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Explanation from "./Explanation";

export interface QuestionsProps {
  currentQuestion: QuizQuestion;
  isQuizOver: boolean;
  userAnswers: {
    [questionId: number]: number[];
  };
  handleOptionClick: (option: QuizOption) => void;
  handleNextQuestionButtonClick: () => void;
  handlePrevQuestionButtonClick: () => void;
}

export default function Questions({
  currentQuestion,
  isQuizOver,
  userAnswers,
  handleOptionClick,
  handleNextQuestionButtonClick,
  handlePrevQuestionButtonClick,
}: QuestionsProps): React.ReactElement {
  const { question, options, explanation, id } = currentQuestion;
  const active = useSelector((state: RootState) => state.quiz.selectedOption);
  return (
    <div className="container mx-auto mt-5 pt-5">
      <h2 className="lead h5">
        {`${id}. `}
        {question}
      </h2>
      <>
        {options.map((option, _index) => (
          <div className="d-grid gap-2" key={option.id}>
            <Button
              onClick={() => handleOptionClick(option)}
              disabled={isQuizOver}
              variant="outline-success"
              size="lg"
              className={`m-2 p-2 ${active === option.id ? "active" : ""}`}
            >
              {option.label}
            </Button>
          </div>
        ))}
        {explanation && userAnswers[currentQuestion.id] && (
          <Explanation explanation={explanation} />
        )}

        <Button
          variant="success"
          className="float-start"
          onClick={() => handlePrevQuestionButtonClick()}
          disabled={id === 1 || isQuizOver}
        >
          Prev Question
        </Button>
        <Button
          variant="success"
          className="float-end"
          onClick={() => handleNextQuestionButtonClick()}
          disabled={isQuizOver}
        >
          Next Question
        </Button>
      </>
    </div>
  );
}
