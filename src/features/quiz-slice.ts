import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
        index: number;
      }>
    ) => {
      const { questionId, option, index } = action.payload;
      const { id: optionId, isCorrect } = option;
      //const currentQuestionState = current(state.questions)
      state.selectedOption = index;
      if (state.userAnswers[questionId]) {
        /* if (currentQuestionState[questionId].isMultiChoice) {
                    state.userAnswers[questionId] = [...state.userAnswers[questionId], optionId];
                } else { */
        state.userAnswers[questionId] = [optionId];
        //}
      } else {
        state.userAnswers[questionId] = [optionId];
      }

      if (isCorrect) {
        state.score += 1;
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
