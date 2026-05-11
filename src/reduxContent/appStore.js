import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reduxContent/userSlice";
import feedReducer from "../reduxContent/feedSlice";
import connectionsReducer from "../reduxContent/connections";
import requestReducer from "../reduxContent/requests";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionsReducer,
    requests: requestReducer,
  },
});

export default appStore;
