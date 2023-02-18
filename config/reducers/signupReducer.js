import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
}

const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {
        firstNameChange: (state, action) => {
            state.firstName = action.payload.value;
        },
        lastNameChange: (state, action) => {
            state.lastName = action.payload.value;
        },
        emailChange: (state, action) => {
            state.email = action.payload.value;
        },
        usernameChange: (state, action) => {
            state.username = action.payload.value;
        },
        passwordChange: (state, action) => {
            state.password = action.payload.value;
        },
    }
});

export const firstNameChange = signupSlice.actions.firstNameChange;
export const lastNameChange = signupSlice.actions.lastNameChange;
export const emailChange = signupSlice.actions.emailChange;
export const usernameChange = signupSlice.actions.usernameChange;
export const passwordChange = signupSlice.actions.passwordChange;
export default signupSlice.reducer;