import { configureStore } from "@reduxjs/toolkit";

import signupReducer from "../reducers/signupReducer";
import loginReducer from "../reducers/loginReducer";

const store = configureStore({
    reducer:{
        signup: signupReducer,
        login: loginReducer 
    } 
});

export default store;