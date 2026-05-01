import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reduxContent/userSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default appStore;
