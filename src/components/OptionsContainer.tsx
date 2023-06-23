import { ReactElement, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUserAnswer } from "../features/quiz-slice";
import { RootState } from "../store";
import { useLocation } from "react-router";

export interface OptionContainerProps {
  type: boolean;
  option: QuizOption;
  isQuizOver: boolean;
  userOption: string;
  onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currentQuestion: QuizQuestion;
  index: number;
}

export default function OptionContainer({
  type,
  option,
  isQuizOver,
  userOption,
  onChangeValue,
  currentQuestion,
  index,
}: OptionContainerProps): ReactElement {
  const dispatch = useDispatch();
  const location = useLocation();
  const isResults = location.pathname === "/results";
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const questionId = currentQuestion.id;
  const userAnswers = useSelector((state: RootState) => state.quiz.userAnswers);

  const handleOptionClick = (option: QuizOption) => {
    dispatch(setUserAnswer({ questionId: currentQuestion.id, option }));
  };

  const handleOptionChange = (optionId: number, option: QuizOption) => {
    const isSelected = selectedOptions.includes(optionId);

    if (isSelected) {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
    }

    handleOptionClick(option);
  };

  const className = () => {
    if (
      isResults &&
      userAnswers[currentQuestion.id] &&
      (
        document.getElementById(
          `question-${questionId}-optionContainer-${index}-option-${option.id}`
        ) as HTMLInputElement
      )?.checked &&
      option.isCorrect === userAnswers[currentQuestion.id].includes(option.id)
    ) {
      return "bg-success";
    } else if (
      isResults &&
      userAnswers[currentQuestion.id] &&
      (
        document.getElementById(
          `question-${questionId}-optionContainer-${index}-option-${option.id}`
        ) as HTMLInputElement
      )?.checked &&
      option.isCorrect !== userAnswers[currentQuestion.id].includes(option.id)
    ) {
      return "text-danger";
    } else if (isQuizOver && option.isCorrect) {
      return "bg-success";
    } else {
      return "";
    }
  };

  if (type) {
    return (
      <div className={className()}>
        <Form.Check
          key={`question-${questionId}-option-${option.id}`}
          type="checkbox"
          id={`question-${questionId}-optionContainer-${index}-option-${option.id}`}
          className="option"
        >
          <Form.Check.Input
            disabled={isQuizOver || isResults}
            type="checkbox"
            checked={
              userAnswers[currentQuestion.id]
                ? userAnswers[currentQuestion.id].includes(option.id)
                : selectedOptions.includes(option.id)
            }
            onChange={() => handleOptionChange(option.id, option)}
            value={option.label}
            name={option.label}
          />
          <Form.Check.Label>{option.label}</Form.Check.Label>
        </Form.Check>
      </div>
    );
  }

  return (
    <div className={className()}>
      <Form.Check
        key={`question-${questionId}-option-${option.id}`}
        type="radio"
        id={`question-${questionId}-optionContainer-${index}-option-${option.id}`}
        className="option"
      >
        <Form.Check.Input
          disabled={isQuizOver || isResults}
          onClick={() => handleOptionClick(option)}
          type="radio"
          onChange={onChangeValue}
          value={option.label}
          name={option.label}
          checked={
            userAnswers[currentQuestion.id]
              ? userAnswers[currentQuestion.id].includes(option.id)
              : userOption === option.label
          }
        />
        <Form.Check.Label>{option.label}</Form.Check.Label>
      </Form.Check>
    </div>
  );
}
