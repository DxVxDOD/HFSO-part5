import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import notificationReducer from "../reducers/notificationReducer";
import blogReducer from "../reducers/blogReducer";
import userReducer from "../reducers/userReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
