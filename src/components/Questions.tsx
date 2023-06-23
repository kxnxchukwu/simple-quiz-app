import React, { useMemo } from "react";
import { shuffleArray } from "../utils/shuffle";
import Explanation from "./Explanation";
import ActionButtons from "./ActionButtons";
import OptionContainer from "./OptionsContainer";

export interface QuestionsProps {
  currentQuestion: QuizQuestion;
  isQuizOver: boolean;
  userAnswers: {
    [questionId: number]: number[];
  };
  className?: string;
}

export default function Questions({
  currentQuestion,
  isQuizOver,
  userAnswers,
  className,
}: QuestionsProps): React.ReactElement {
  const [userOption, setUserOption] = React.useState("");

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserOption(event.target.value);
  };
  const { question, options, explanation, id, isMultiChoice } = currentQuestion;
  const shuffledOptions = useMemo(() => shuffleArray(options), [options]);

  return (
    <div
      className={`questionContainer card border-0 mt-1 p-2 mx-auto ${
        className ? "" : "container"
      }`}
    >
      <h4 className="question">{question}</h4>
      <div className="optionContainer mb-5 row col-12">
        {shuffledOptions.map((option, index) => (
          <OptionContainer
            key={`question-${id}-index-${index}-option-${option.id}`}
            onChangeValue={onChangeValue}
            userOption={userOption}
            isQuizOver={isQuizOver}
            type={isMultiChoice}
            option={option}
            currentQuestion={currentQuestion}
            index={index}
          />
        ))}
        {explanation && userAnswers[currentQuestion.id] && (
          <Explanation explanation={explanation} />
        )}
      </div>
      {className ? <></> : <ActionButtons id={id} />}
    </div>
  );
}
