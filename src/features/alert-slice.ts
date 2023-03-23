import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setUserAnswer } from './quiz-slice';

interface AlertState {
    show: boolean;
}

const initialState: AlertState = {
    show: false
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setShow: (state, action: PayloadAction<{ show: boolean }>) => {
            state.show = action.payload.show
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setUserAnswer, (state) => {
            state.show = true
        })
    }
});

export const { setShow } = alertSlice.actions;

export default alertSlice.reducer;