import { configureStore } from "@reduxjs/toolkit";

import signupReducer from "../reducers/signupReducer";
import loginReducer from "../reducers/loginReducer";
import mealsReducer from "../reducers/mealsReducer";
import dateReducer from "../reducers/dateReducer";
import adminReducer from "../reducers/adminReducer";

const store = configureStore({
    reducer:{
        signup: signupReducer,
        login: loginReducer,
        meals: mealsReducer,
        date: dateReducer ,
        admin: adminReducer
    } 
});

export default store;