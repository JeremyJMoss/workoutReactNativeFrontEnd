import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    signupData : {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
    },
    fetchStatus: ""
}

export const sendSignupData = createAsyncThunk("sendSignupData", async (postData) => {
    const response = await fetch("http://192.168.1.93:3000/signup", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(postData)
    });
    return response.json();
})

const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {
        firstNameChange: (state, action) => {
            state.signupData.firstName = action.payload.value;
        },
        lastNameChange: (state, action) => {
            state.signupData.lastName = action.payload.value;
        },
        emailChange: (state, action) => {
            state.signupData.email = action.payload.value;
        },
        usernameChange: (state, action) => {
            state.signupData.username = action.payload.value;
        },
        passwordChange: (state, action) => {
            state.signupData.password = action.payload.value;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(sendSignupData.fulfilled, (state, action) => {
            state.fetchStatus = "success";
        })
        .addCase(sendSignupData.pending, (state) => {
            state.fetchStatus = "loading";
        })
        .addCase(sendSignupData.rejected, (state) => {
            state.fetchStatus = "error";
        })
    }
});

export const firstNameChange = signupSlice.actions.firstNameChange;
export const lastNameChange = signupSlice.actions.lastNameChange;
export const emailChange = signupSlice.actions.emailChange;
export const usernameChange = signupSlice.actions.usernameChange;
export const passwordChange = signupSlice.actions.passwordChange;
export default signupSlice.reducer;