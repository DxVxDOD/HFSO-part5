import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import notificationReducer from "../reducers/notificationReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
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
