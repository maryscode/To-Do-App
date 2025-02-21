import { configureStore } from "@reduxjs/toolkit"; // creates Redux store
import tasksReducer from "./tasksSlice"; // Import the reducer

export const store = configureStore({
    reducer: {
        tasks: tasksReducer, // register the tasks slice
    }
})