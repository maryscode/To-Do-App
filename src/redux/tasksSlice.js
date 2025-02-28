import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    tasks: [],
}

// Create redux slice
const tasksSlice = createSlice({
    name: "tasks", // name of slice
    initialState,
    reducers: { // defines how we update state
        addTask: (state,action) => { // adds new tasks to the list
            state.tasks.push({
                id: Date.now(), 
                text: action.payload, 
                isCompleted: false
            });
        },
        removeTask: (state,action) => { // delete task
            state.tasks = state.tasks.filter(
                task => task.id !== action.payload
            )
        },
        toggleTask: (state,action) => { // mark complete/incomplete
            const task = state.tasks.find(task => task.id === action.payload);
            if (task){
                task.isCompleted = !task.isCompleted; // if task exists, mark completed task as not completed task
            }
        }
    }
})

export const { addTask, removeTask, toggleTask, setFilter } = tasksSlice.actions; // export actions
export default tasksSlice.reducer; // export reducer