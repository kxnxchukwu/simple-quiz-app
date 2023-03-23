import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './features/alert-slice';
import quizReducer from './features/quiz-slice';

export const store = configureStore({
    reducer: {
        quiz: quizReducer,
        alert: alertReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;