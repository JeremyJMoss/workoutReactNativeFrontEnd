import { createSlice, createAsyncThunk, configureStore } from "@reduxjs/toolkit";
import { BASE_URL, JWT_SECRET_KEY } from "../config";
import jwt from "expo-jwt";
import * as SecureStore from "expo-secure-store";

const initialState = {
    loginDetails: {
        username: "",
        password: ""
    },
    loginResponse: {
        hasError: false,
        errorMessage: "",
        token: "",
        fetchStatus: ""
    },
    userDetails: {
        email: "",
        firstName: "",
        lastName: "",
        userId: "",
        username: "",
        isAdmin: false
    },
    isReloadingApp: true
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

export const attemptTokenAuthentication = createAsyncThunk(
    "attemptTokenAuthentication", 
    async (_, { rejectWithValue }) => {
            try{
                const token = await SecureStore.getItemAsync("userToken");
                if (!token){
                    throw new Error("No token found in storage");
                }
                const response = await fetch(`${BASE_URL}/login/token`, {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) { 
                    const error = await response.json();
                    throw new Error(error.message);
                }

                return response.json();
            }
            catch (error) {
                return rejectWithValue(error.message);
            }
    }
)

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
        logoutUser: (state) => {
            state.userDetails = initialState.userDetails;
            state.loginResponse.token = "";
            SecureStore.deleteItemAsync("userToken");
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(attemptTokenAuthentication.fulfilled, (state, action) => {
            state.loginResponse.fetchStatus = "success";
            state.isReloadingApp = false;
            state.loginResponse.token = action.payload.token;

            const userInfo = jwt.decode(action.payload.token, JWT_SECRET_KEY)
            
            state.userDetails.email = userInfo.email;
            state.userDetails.firstName = userInfo.firstname;
            state.userDetails.lastName = userInfo.lastname;
            state.userDetails.userId = userInfo.id;
            state.userDetails.username = userInfo.username;
            state.userDetails.isAdmin = userInfo.isAdmin ? true : false;
            state.loginDetails = initialState.loginDetails;
        })
        .addCase(attemptTokenAuthentication.pending, (state) => {
            state.loginResponse.fetchStatus = "loading";
        })
        .addCase(attemptTokenAuthentication.rejected, (state, action) => {
            state.loginResponse.fetchStatus = "error";
            state.isReloadingApp = false;
        })
        .addCase(attemptLogin.fulfilled, (state, action) => {
            state.loginResponse.fetchStatus = "success";
            state.loginResponse.token = action.payload.token;
            SecureStore.setItemAsync("userToken", action.payload.token);

            const userInfo = jwt.decode(action.payload.token, JWT_SECRET_KEY);

            //Storing user info into state
            state.userDetails.email = userInfo.email;
            state.userDetails.firstName = userInfo.firstname;
            state.userDetails.lastName = userInfo.lastname;
            state.userDetails.userId = userInfo.id;
            state.userDetails.username = userInfo.username;
            state.userDetails.isAdmin = userInfo.isAdmin ? true : false;
            state.loginDetails = initialState.loginDetails;
        })
        .addCase(attemptLogin.pending, (state) => {
            state.loginResponse.fetchStatus = "loading";
        })
        .addCase(attemptLogin.rejected, (state, action) => {
            state.loginResponse.fetchStatus = "error";
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
export const logoutUser = loginSlice.actions.logoutUser;
export default loginSlice.reducer;