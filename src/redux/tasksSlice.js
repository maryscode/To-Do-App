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
        },
        setFilter: (state,action) => { // Filter: all to do, complete, incomplete
            const allTasks = state.tasks;
            const completedTasks = state.tasks.filter(task => task.isCompleted === true);
            const icompleteTasks = state.tasks.filter(task => task.isCompleted === false);
            if (action.payload === 'completed'){
                console.log('completed!')
                console.log("Current Tasks:", JSON.parse(JSON.stringify(state.tasks)));
                state.tasks = allTasks;
                state.tasks = completedTasks;
            }
            if (action.payload === 'incomplete'){
                console.log('incomplete!')
                console.log("Current Tasks:", JSON.parse(JSON.stringify(state.tasks)));
                state.tasks = allTasks;
                state.tasks = icompleteTasks;
            }
        }
    }
})

export const { addTask, removeTask, toggleTask, setFilter } = tasksSlice.actions; // export actions
export default tasksSlice.reducer; // export reducer