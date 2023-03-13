import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../config";

const initialState = {
    mealTypes: [],
    loginResponse: {
        hasError: false,
        errorMessage: "",
        fetchStatus: ""
    },
}

export const fetchMealTypes = createAsyncThunk(
    "fetchMealTypes", 
    async (_, { rejectWithValue }) => {
    try{
        const response = await fetch(`${BASE_URL}/meals/types`);
        if (!response.ok) { 
            const error = await response.json();
            throw new Error(error.message);
        }

        return response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

const mealsSlice = createSlice({
    name: "meals",
    initialState,
    reducers: {
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
        .addCase(fetchMealTypes.fulfilled, (state, action) => {
            state.loginResponse.fetchStatus = "success";
            state.mealTypes = action.payload.mealTypes;
        })
        .addCase(fetchMealTypes.pending, (state) => {
            state.loginResponse.fetchStatus = "loading";
        })
        .addCase(fetchMealTypes.rejected, (state, action) => {
            state.loginResponse.fetchStatus = "error";
            state.loginResponse.errorMessage = action.payload;
            state.loginResponse.hasError = true;
        })
    }
});

export const setErrorMessage = mealsSlice.actions.setErrorMessage;
export const resetFetchStatus = mealsSlice.actions.resetFetchStatus;
export const resetErrorMessage = mealsSlice.actions.resetErrorMessage;
export default mealsSlice.reducer;