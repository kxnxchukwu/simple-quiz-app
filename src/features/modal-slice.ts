import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
    show: boolean;
}

const initialState: ModalState = {
    show: false
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal: (state, action: PayloadAction<{ show: boolean }>) => {
            state.show = action.payload.show
        }
    }
});

export const { showModal } = modalSlice.actions;

export default modalSlice.reducer;