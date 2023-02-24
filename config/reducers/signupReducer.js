import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../config";

const initialState = {
    signupData : {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
    },
    fetchStatus: "",
    errorMessage: "",
}

export const sendSignupData = createAsyncThunk(
    "sendSignupData", 
    async (postData, { rejectWithValue }) => {
    try{
        const response = await fetch(`${BASE_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) { 
            const error = await response.json();
            throw new Error(error.message);
        }

        return response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
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
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload.value;
        },
        resetFields: (state) => {
            state.signupData = initialState.signupData;
        },
        resetErrorMessage: (state) => {
            state.errorMessage = "";
        },
        resetFetchStatus: (state) => {
            state.fetchStatus = "";
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(sendSignupData.fulfilled, (state, action) => {
            state.fetchStatus = "success";
        })
        .addCase(sendSignupData.pending, (state) => {
            state.fetchStatus = "loading";
        })
        .addCase(sendSignupData.rejected, (state, action) => {
            state.fetchStatus = "error";
            state.errorMessage = action.payload;
        })
    }
});

export const firstNameChange = signupSlice.actions.firstNameChange;
export const lastNameChange = signupSlice.actions.lastNameChange;
export const emailChange = signupSlice.actions.emailChange;
export const usernameChange = signupSlice.actions.usernameChange;
export const passwordChange = signupSlice.actions.passwordChange;
export const setErrorMessage = signupSlice.actions.setErrorMessage;
export const resetFields = signupSlice.actions.resetFields;
export const resetErrorMessage = signupSlice.actions.resetErrorMessage;
export const resetFetchStatus = signupSlice.actions.resetFetchStatus;
export default signupSlice.reducer;