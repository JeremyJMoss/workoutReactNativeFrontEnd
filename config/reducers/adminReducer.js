import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../config";

const initialState = {
    newMealData : {
        name: "",
        servingSize: "",
        unitOfMeasurement: "g",
        energy: "",
        energyMeasurement: "cal",
        protein: "",
        totalFat: "",
        saturatedFat: "",
        carbohydrates: "",
        sugars: "",
        sodium: ""
    },
    fetchStatus: "",
    errorMessage: "",
}

export const createMeal = createAsyncThunk(
    "createMeal", 
    async (postData, { rejectWithValue }) => {
    try{
        const response = await fetch(`${BASE_URL}/admin/meals/createmeal`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${postData.token}`
            },
            body: JSON.stringify({meal: postData.meal})
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

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        nameChange: (state, action) => {
            state.newMealData.name = action.payload.value;
        },
        servingSizeChange: (state, action) => {
            state.newMealData.servingSize = action.payload.value;
        },
        unitOfMeasurementChange: (state, action) => {
            state.newMealData.unitOfMeasurement = action.payload.value;
        },
        energyChange: (state, action) => {
            state.newMealData.energy = action.payload.value;
        },
        energyMeasurementChange: (state, action) => {
            state.newMealData.energyMeasurement = action.payload.value;
        },
        proteinChange: (state, action) => {
            state.newMealData.protein = action.payload.value;
        },
        totalFatChange: (state, action) => {
            state.newMealData.totalFat = action.payload.value;
        },
        saturatedFatChange: (state, action) => {
            state.newMealData.saturatedFat = action.payload.value;
        },
        carbohydratesChange: (state, action) => {
            state.newMealData.carbohydrates = action.payload.value;
        },
        sugarsChange: (state, action) => {
            state.newMealData.sugars = action.payload.value;
        },
        sodiumChange: (state, action) => {
            state.newMealData.sodium = action.payload.value;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload.value;
        },
        resetFields: (state) => {
            state.newMealData = initialState.newMealData;
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
        .addCase(createMeal.fulfilled, (state) => {
            state.fetchStatus = "success";
        })
        .addCase(createMeal.pending, (state) => {
            state.fetchStatus = "loading";
        })
        .addCase(createMeal.rejected, (state, action) => {
            state.fetchStatus = "error";
            state.errorMessage = action.payload;
        })
    }
});

export const nameChange = adminSlice.actions.nameChange;
export const servingSizeChange = adminSlice.actions.servingSizeChange;
export const unitOfMeasurementChange = adminSlice.actions.unitOfMeasurementChange;
export const energyChange = adminSlice.actions.energyChange;
export const energyMeasurementChange = adminSlice.actions.energyMeasurementChange;
export const proteinChange = adminSlice.actions.proteinChange;
export const totalFatChange = adminSlice.actions.totalFatChange;
export const saturatedFatChange = adminSlice.actions.saturatedFatChange;
export const carbohydratesChange = adminSlice.actions.carbohydratesChange;
export const sugarsChange = adminSlice.actions.sugarsChange;
export const sodiumChange = adminSlice.actions.sodiumChange;
export const setErrorMessage = adminSlice.actions.setErrorMessage;
export const resetFields = adminSlice.actions.resetFields;
export const resetErrorMessage = adminSlice.actions.resetErrorMessage;
export const resetFetchStatus = adminSlice.actions.resetFetchStatus;
export default adminSlice.reducer;