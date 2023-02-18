import { configureStore } from "@reduxjs/toolkit";

import signupReducer from "../reducers/signupReducer";

const store = configureStore({
    reducer:{
        signup: signupReducer, 
    } 
});

export default store;