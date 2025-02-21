import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // access Redux state
import { toggleTask } from "../redux/tasksSlice";



const TaskList = () => {
    // get tasks from redux state
    const [taskText, setTaskText] = useState('');
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch(); // get Redux dispatch fn

    
    const handleCheck = (e) => {
        dispatch(toggleTask(e)); // toggle complete❌
    }

    return (
        <div>
            <h2>Task list</h2>
            <ul className="list-none">
                {tasks.length === 0 ? (
                    <p>No tasks yet!</p>
                ) : (
                    tasks.map((task) => (
                        <li key={task.id}>
                            <input 
                                type="checkbox"
                                checked={task.isCompleted}
                                onChange={() => handleCheck(task.id)} // pass id directly
                            />
                            {task.text} {task.isCompleted ? "✅" : "⬜"}
                        </li>
                    ))   
                )}
            </ul>
        </div>
    )
}
export default TaskList;