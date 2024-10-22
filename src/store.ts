import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/userSlice";   // Import the user slice
import taskReducer from "./store/taskSlice";   // Import the task slice

// Create and configure the Redux store
export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer,
  },
});

// Export types to use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
