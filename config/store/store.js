import { configureStore } from "@reduxjs/toolkit";

import signupReducer from "../reducers/signupReducer";
import loginReducer from "../reducers/loginReducer";
import dateReducer from "../reducers/dateReducer";
import adminReducer from "../reducers/adminReducer";

const store = configureStore({
    reducer:{
        signup: signupReducer,
        login: loginReducer,
        date: dateReducer ,
        admin: adminReducer
    } 
});

export default store;