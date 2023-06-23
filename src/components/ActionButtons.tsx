import { ReactElement } from "react";
import { useNavigate, useLocation } from "react-router";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  nextQuestion,
  endQuiz,
  prevQuestion,
  restartQuiz,
} from "../features/quiz-slice";

export interface ActionButtonProps {
  id?: number;
}

export default function ActionButtons({ id }: ActionButtonProps): ReactElement {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isQuizOver = useSelector((state: RootState) => state.quiz.isQuizOver);
  const currentQuestionIndex = useSelector(
    (state: RootState) => state.quiz.currentQuestionIndex
  );
  const questionLength = useSelector(
    (state: RootState) => state.quiz.questions.length
  );
  const endOfQuiz = currentQuestionIndex === questionLength - 1;
  const handleNextQuestionButtonClick = () => {
    if (endOfQuiz) {
      dispatch(endQuiz());
      navigate("/results");
    } else {
      dispatch(nextQuestion());
    }
  };

  const handlePrevQuestionButtonClick = () => {
    if (!endOfQuiz) {
      dispatch(prevQuestion());
    } else {
      navigate("/review");
    }
  };

  const handleRestartQuiz = () => {
    dispatch(restartQuiz());
    navigate("/");
  };

  const handleSubmit = () => {
    dispatch(endQuiz());
    navigate("/results");
  };

  const buttonComponent = () => {
    switch (location.pathname) {
      case "/review":
        return (
          <div className="d-grid gap-2 d-md-block mx-auto col-lg-10 singleButton">
            <button
              className="btn btn-success col-lg-12"
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        );
      case "/results":
        return (
          <div className="d-grid gap-2 d-md-block mx-auto col-lg-10 singleButton">
            <button
              className="btn btn-success col-lg-12"
              type="button"
              onClick={handleRestartQuiz}
            >
              Restart
            </button>
          </div>
        );
      default:
        return (
          <div className="actionButtonsContainer mt-5">
            <Button
              variant="outline-success"
              className="float-start"
              onClick={() => handlePrevQuestionButtonClick()}
              disabled={id === 1 || isQuizOver}
            >
              {endOfQuiz ? "Review" : "Back"}
            </Button>
            <Button
              className="float-end"
              variant="success"
              onClick={() => handleNextQuestionButtonClick()}
              disabled={isQuizOver}
            >
              {endOfQuiz ? "Submit" : "Next"}
            </Button>
          </div>
        );
    }
  };

  return buttonComponent();
}
