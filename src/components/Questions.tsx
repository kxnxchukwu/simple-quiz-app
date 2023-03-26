import React, { useMemo } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { shuffleArray } from "../utils/shuffle";
import Explanation from "./Explanation";

export interface QuestionsProps {
  currentQuestion: QuizQuestion;
  isQuizOver: boolean;
  userAnswers: {
    [questionId: number]: number[];
  };
  handleOptionClick: (option: QuizOption, index: number) => void;
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
  const shuffledOptions = useMemo(() => shuffleArray(options), [options]);
  return (
    <div className="container-fluid mx-auto mt-2 pt-2">
      <h2 className="lead h5">
        {`${id}. `}
        {question}
      </h2>
      <>
        {shuffledOptions.map((option, index) => (
          <div className="d-grid gap-2" key={option.id}>
            <Button
              onClick={() => handleOptionClick(option, index + 1)}
              disabled={isQuizOver}
              variant={`${
                !option.isCorrect && active === index + 1
                  ? "outline-danger"
                  : "outline-success"
              }`}
              size="lg"
              className={`m-2 p-2 ${
                active === index + 1 || (option.isCorrect && !!active)
                  ? "active"
                  : ""
              }`}
            >
              {option.label}
            </Button>
          </div>
        ))}
        {explanation && userAnswers[currentQuestion.id] && (
          <Explanation explanation={explanation} />
        )}

        <div className="mb-4 p-4">
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
        </div>
      </>
    </div>
  );
}
