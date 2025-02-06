import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import adminReducer from "../features/adminSlice"
const store = configureStore({
  reducer: {
    admin:adminReducer,
    auth: authReducer,
  },
});

export default store;
