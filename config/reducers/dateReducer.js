import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    date: new Date().toISOString()
}

const dateSlice = createSlice({
    name: "date",
    initialState,
    reducers: {
        setToCurrentDate: (state) => {
            state.date = initialState.date;
        },
        moveForwardDate: (state) => {
            const tomorrow = new Date(state.date);
            tomorrow.setDate(tomorrow.getDate() + 1);
            state.date = tomorrow.toISOString();
        },
        moveBackwardDate: (state) => {
            const yesterday = new Date(state.date);
            yesterday.setDate(yesterday.getDate() - 1);
            state.date = yesterday.toISOString();
        },

    },
});

export const setToCurrentDate = dateSlice.actions.setToCurrentDate;
export const moveForwardDate = dateSlice.actions.moveForwardDate;
export const moveBackwardDate = dateSlice.actions.moveBackwardDate;
export default dateSlice.reducer;