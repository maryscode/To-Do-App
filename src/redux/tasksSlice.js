import { createSlice } from "@reduxjs/toolkit";

export const fetchTasks = () => async(dispatch) => {
    dispatch(tasksLoading());

    try {
        const response = await fetch(`http://localhost:4000/tasks`);
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json();
        dispatch(tasksLoaded(data));

    } catch (error) {
        dispatch(tasksError(error.message))
        console.error("Error fetching data: ", error);
    }
}

// initial state
const initialState = {
    tasks: [],
    status: 'idle',
    error: null,
}

// Create redux slice
const tasksSlice = createSlice({
    name: "tasks", // name of slice
    initialState,
    reducers: { // defines how we update state
        tasksLoading: (state) => {
            state.status = 'loading';
        },
        tasksLoaded: (state, action) => {
            state.status = 'succeeded';
            state.tasks = action.payload;
        },
        tasksError: (state, action) => {
            state.status = 'error';
            state.error = action.payload;
        },
        addTask: (state,action) => { // adds new tasks to the list
            state.tasks.push({
                id: Date.now(), // still local, until we POST
                title: action.payload,
                priority: "medium",       // default value for now
                status: "todo",           // default column
                isCompleted: false
            });

                        
        },
        removeTask: (state,action) => { // delete task
            state.tasks = state.tasks.filter(
                task => task.id !== action.payload
            )
        },
        editTask: (state,action) => { // editTask Text
            console.log('edit task ID: ' + action.payload.id)
            console.log('edit task text: ' + action.payload.text)
            const task = state.tasks.find(task => task.id === action.payload.id);
            task.text = action.payload.text;
        },     
        toggleTask: (state,action,) => { // mark complete/incomplete
            const task = state.tasks.find(task => task.id === action.payload);
            if (task){
                task.isCompleted = !task.isCompleted; // if task exists, mark completed task as not completed task
            }
        },
        reorderTasks: (state,action) => {
            //resave new task order
            const newOrder = action.payload.map((taskID) => 
                state.tasks.find(task => task.id === taskID) // action.payload = array of taskIDs. Map through and save an array of tasks objects based on task ID
            );
            console.log('reorderTasks: ' + action.payload);
            // Ensure not adding "undefined"
            state.tasks = action.payload; // update tasks order;
        }
    }
})

export const { 
    addTask, 
    removeTask, 
    toggleTask, 
    reorderTasks, 
    editTask,
    tasksLoading,
    tasksLoaded,
    tasksError
} = tasksSlice.actions; // export actions

export default tasksSlice.reducer; // export reducer