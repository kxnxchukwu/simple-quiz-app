import { ReactElement } from "react";
import { useSelector } from "react-redux";
import ProgressBar from "react-bootstrap/ProgressBar";
import { RootState } from "../store";
import { Container, Button } from "react-bootstrap";

export default function Progress(): ReactElement {
  const currentQuestionIndex = useSelector(
    (state: RootState) => state.quiz.currentQuestionIndex
  );
  const total: number = useSelector(
    (state: RootState) => state.quiz.questions.length
  );
  const now = Math.round((currentQuestionIndex / total) * 100);

  const isLastQuestion = currentQuestionIndex === total - 1;
  return (
    <Container className="mx-auto mt-3 d-flex justify-content-center align-items-center row">
      <div className="col-10">
        <ProgressBar variant="success" now={!isLastQuestion ? now : 100} />
      </div>
      <Button size="sm" className="col-2" variant="light">{`${
        !isLastQuestion ? now : 100
      }%`}</Button>
    </Container>
  );
}
