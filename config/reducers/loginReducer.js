import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../config";

const initialState = {
    loginDetails: {
        username: "",
        password: ""
    },
    loginResponse: {
        hasError: false,
        loggedIn: false,
        errorMessage: "",
        token: "",
        fetchStatus: ""
    },
    
}

export const attemptLogin = createAsyncThunk(
    "attemptLogin", 
    async (postData, { rejectWithValue }) => {
    try{
        const response = await fetch(`${BASE_URL}/login`, {
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

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        usernameChange: (state, action) => {
            state.loginDetails.username = action.payload.value;
        },
        passwordChange: (state, action) => {
            state.loginDetails.password = action.payload.value;
        },
        resetFetchStatus: (state) => {
            state.loginResponse.fetchStatus = "";
        },
        setErrorMessage: (state, action) => {
            state.loginResponse.errorMessage = action.payload.value;
            state.loginResponse.hasError = true;
        },
        resetErrorMessage: (state) => {
            state.loginResponse.errorMessage = "";
            state.loginResponse.hasError = false;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(attemptLogin.fulfilled, (state, action) => {
            state.loginResponse.fetchStatus = "success";
            state.loginResponse.loggedIn = true;
            state.loginDetails = initialState.loginDetails;
        })
        .addCase(attemptLogin.pending, (state) => {
            state.loginResponse.fetchStatus = "loading";
        })
        .addCase(attemptLogin.rejected, (state, action) => {
            state.loginResponse.fetchStatus = "error";
            state.loginResponse.loggedIn = false;
            state.loginResponse.errorMessage = action.payload;
            state.loginResponse.hasError = true;
        })
    }
});

export const usernameChange = loginSlice.actions.usernameChange;
export const passwordChange = loginSlice.actions.passwordChange;
export const setErrorMessage = loginSlice.actions.setErrorMessage;
export const resetFields = loginSlice.actions.resetFields;
export const resetFetchStatus = loginSlice.actions.resetFetchStatus;
export const resetErrorMessage = loginSlice.actions.resetErrorMessage;
export default loginSlice.reducer;