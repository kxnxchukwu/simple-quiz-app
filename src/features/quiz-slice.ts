import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import data from '../api/data.json'

interface QuizState {
    questions: QuizQuestion[];
    currentQuestionIndex: number;
    userAnswers: { [questionId: number]: number[] };
    isQuizOver: boolean;
    score: number
}

const initialState: QuizState = {
    questions: data.questions,
    currentQuestionIndex: 0,
    userAnswers: {},
    isQuizOver: false,
    score: 0
};

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setQuestions: (state, action: PayloadAction<QuizQuestion[]>) => {
            state.questions = action.payload;
        },
        setUserAnswer: (state, action: PayloadAction<{ option: QuizOption, questionId: number; }>) => {
            const { questionId, option } = action.payload;
            const { id: optionId, isCorrect } = option
            if (state.userAnswers[questionId]) {
                /*if (state.questions[questionId].isMultiChoice) {
                    state.userAnswers[questionId] = [...state.userAnswers[questionId], optionId];
                } else { */
                state.userAnswers[questionId] = [optionId];
                //}
            } else {
                state.userAnswers[questionId] = [optionId];
            }

            if (isCorrect) {
                state.score += 10
            }
        },
        prevQuestion: (state) => {
            state.currentQuestionIndex--;
        },
        nextQuestion: (state) => {
            state.currentQuestionIndex++;
        },
        restartQuiz: (state) => {
            state.currentQuestionIndex = 0;
            state.userAnswers = {};
            state.isQuizOver = false;
            state.score = 0
        },
        endQuiz: (state) => {
            if (state.currentQuestionIndex === state.questions.length - 1) {
                state.isQuizOver = true;
            }
        },
    }
});

export const { setQuestions, setUserAnswer, prevQuestion, nextQuestion, restartQuiz, endQuiz } = quizSlice.actions;

export default quizSlice.reducer;