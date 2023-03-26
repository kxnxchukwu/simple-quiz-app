import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './features/alert-slice';
import modalReducer from './features/modal-slice';
import quizReducer from './features/quiz-slice';

export const store = configureStore({
    reducer: {
        quiz: quizReducer,
        alert: alertReducer,
        modal: modalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;