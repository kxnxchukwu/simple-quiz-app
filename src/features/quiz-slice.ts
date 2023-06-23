import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import data from "../api/data.json";

interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  userAnswers: { [questionId: number]: number[] };
  isQuizOver: boolean;
  score: number;
  selectedOption: number;
  timeLeft: number;
}

const initialState: QuizState = {
  questions: data.questions,
  currentQuestionIndex: 0,
  userAnswers: {},
  isQuizOver: false,
  score: 0,
  selectedOption: 0,
  timeLeft: 3600,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<QuizQuestion[]>) => {
      state.questions = action.payload;
    },
    setUserAnswer: (
      state,
      action: PayloadAction<{
        option: QuizOption;
        questionId: number;
      }>
    ) => {
      const { questionId, option } = action.payload;
      const { id: optionId, isCorrect } = option;
      const currentQuestionState = current(state.questions);

      if (currentQuestionState[questionId - 1].isMultiChoice) {
        if (state.userAnswers[questionId]) {
          // User has answered this multiple-choice question before
          if (state.userAnswers[questionId].includes(optionId)) {
            // Selected option already exists in user answers, remove it
            state.userAnswers[questionId] = state.userAnswers[
              questionId
            ].filter((answer) => answer !== optionId);
          } else {
            // Add the selected option to user answers
            state.userAnswers[questionId].push(optionId);
          }
        } else {
          // User answers this multiple-choice question for the first time
          state.userAnswers[questionId] = [optionId];
        }
      } else {
        // Single-choice question
        state.userAnswers[questionId] = [optionId];
      }

      // Check if the selected options are correct for a multiple-choice question
      if (
        currentQuestionState[questionId - 1].isMultiChoice &&
        state.userAnswers[questionId].some(
          (answer) =>
            !currentQuestionState[questionId - 1].options.find(
              (option) => option.id === answer && option.isCorrect
            )
        )
      ) {
        state.score += 0; // At least one wrong option, add zero points to the score
      } else if (isCorrect) {
        state.score += 1; // Correct single-choice question or all options are correct for multiple-choice question
      }
    },
    prevQuestion: (state) => {
      state.currentQuestionIndex--;
      state.selectedOption = 0;
    },
    nextQuestion: (state) => {
      state.currentQuestionIndex++;
      state.selectedOption = 0;
    },
    jumptoQuestion: (
      state,
      action: PayloadAction<{ questionNumber: number }>
    ) => {
      const questionNumber = action.payload.questionNumber;
      const isQuestionNumberFromUserLarger =
        questionNumber > state.questions.length;
      if (isQuestionNumberFromUserLarger) {
        state.currentQuestionIndex = state.questions.length - 1;
        state.selectedOption = 0;
        return state;
      }
      if (questionNumber === 0) {
        state.currentQuestionIndex = 1;
        state.selectedOption = 0;
        return state;
      }
      state.currentQuestionIndex = questionNumber - 1;
      state.selectedOption = 0;
    },
    restartQuiz: (state) => {
      state.currentQuestionIndex = 0;
      state.userAnswers = {};
      state.isQuizOver = false;
      state.score = 0;
      state.selectedOption = 0;
      state.timeLeft = 3600;
    },
    endQuiz: (state) => {
      if (state.currentQuestionIndex === state.questions.length - 1) {
        state.isQuizOver = true;
      }
    },
    setTimeLeft: (
      state,
      action: PayloadAction<{
        timeLeft: number;
      }>
    ) => {
      const { timeLeft } = action.payload;
      if (timeLeft === 0) {
        state.timeLeft = 0;
        state.isQuizOver = true;
      }
      state.timeLeft = action.payload.timeLeft;
    },
  },
});

export const {
  setQuestions,
  setUserAnswer,
  prevQuestion,
  nextQuestion,
  restartQuiz,
  endQuiz,
  jumptoQuestion,
  setTimeLeft,
} = quizSlice.actions;

export default quizSlice.reducer;
