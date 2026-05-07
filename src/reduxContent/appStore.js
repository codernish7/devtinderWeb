import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reduxContent/userSlice";
import feedReducer from "../reduxContent/feedSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});

export default appStore;
