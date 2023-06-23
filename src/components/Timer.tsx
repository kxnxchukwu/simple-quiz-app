import { ReactElement, useEffect } from "react";
import { getTimeLeftInHMS } from "../utils/TimeUlils";
import { useDispatch, useSelector } from "react-redux";
import { setTimeLeft } from "../features/quiz-slice";
import { RootState } from "../store";
import Digit from "./Digit";

export default function Timer(): ReactElement {
  const timeLeft = useSelector((state: RootState) => state.quiz.timeLeft);
  const dispatch = useDispatch();

  const startTimer = () => {
    const timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        dispatch(setTimeLeft({ timeLeft: timeLeft - 1 }));
      }
    }, 1000);

    return timerInterval;
  };
  const { hours, minutes, secs } = getTimeLeftInHMS(timeLeft);

  useEffect(() => {
    const timerInterval = startTimer();

    return () => clearInterval(timerInterval);
  });

  return (
    <>
      <Digit value={hours} />
      <Digit value={minutes} />
      <Digit value={secs} />
    </>
  );
}
