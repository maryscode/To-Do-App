import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksSlice";

const AddTaskForm = () => {
    const [taskText, setTaskText] = useState('');
    const dispatch = useDispatch(); // get Redux dispatch fn

    const handleSubmit = (e) => {
        e.preventDefault();

        if(taskText.trim() === "") return;

        dispatch(addTask(taskText)); /// add to state
        setTaskText(""); // reset input
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter a task"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
            />
            <button type="submit">Add Task</button>
        </form>
    )
}

export default AddTaskForm;