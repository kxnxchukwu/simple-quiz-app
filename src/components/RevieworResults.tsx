import { ReactElement } from "react";
import Questions from "./Questions";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Container } from "react-bootstrap";
import ActionButtons from "./ActionButtons";

export default function RevieworResults(): ReactElement {
  const { questions, isQuizOver, userAnswers } = useSelector(
    (state: RootState) => state.quiz
  );

  return (
    <Container className="grid-container" fluid>
      <div className="grid-item mb-5">
        {questions.map((question) => {
          return (
            <div className="p-2 mb-2" key={question.id}>
              <Questions
                currentQuestion={question}
                isQuizOver={isQuizOver}
                userAnswers={userAnswers}
                className="gridItem"
              />
            </div>
          );
        })}
      </div>
      <div className="grid-item m-5">
        <ActionButtons />
      </div>
    </Container>
  );
}
