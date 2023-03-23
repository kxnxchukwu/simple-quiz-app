import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Button } from "react-bootstrap";

export interface ResultsProps {
  handleRestartQuiz: () => void;
}

export default function Results({
  handleRestartQuiz,
}: ResultsProps): React.ReactElement {
  const score = useSelector((state: RootState) => state.quiz.score);
  const questionLength: number = useSelector(
    (state: RootState) => state.quiz.questions.length
  );
  const total =
    questionLength && typeof questionLength == "number" && questionLength;
  return (
    <div className="container mx-auto mt-5 pt-5">
      <h2 className="lead h5">Quiz Results</h2>
      <p>
        You scored {score} out of {total}
      </p>
      <Button variant="outline-primary" onClick={handleRestartQuiz}>
        Restart Quiz
      </Button>
    </div>
  );
}
