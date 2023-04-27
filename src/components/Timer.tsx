import { ReactElement, useEffect } from "react";
import { getTimeLeftInHMS, getTimeTextStyle } from "../utils/TimeUlils";
import { useDispatch, useSelector } from "react-redux";
import { setTimeLeft } from "../features/quiz-slice";
import { RootState } from "../store";

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
    <p className={`${getTimeTextStyle(timeLeft)} col`}>
      {" "}
      {`${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}
    </p>
  );
}
