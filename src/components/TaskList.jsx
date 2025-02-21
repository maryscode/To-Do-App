import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // access Redux state
import { toggleTask, removeTask, setFilter } from "../redux/tasksSlice";



const TaskList = () => {
    // get tasks from redux state
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch(); // get Redux dispatch fn

    
    const handleCheck = (e) => {
        dispatch(toggleTask(e)); // toggle complete❌
    }

    return (
        <div>
            <h2>filter</h2>
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setFilter('completed')); 
                }} 
                className=""
            >
                Show Completed
            </button>
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setFilter('incomplete')); 
                }} 
                className=""
            >
                Show Incomplete
            </button>            

            <h2>Task list</h2>
            <ul className="list-none">
                {tasks.length === 0 ? (
                    <p>No tasks yet!</p>
                ) : (
                    tasks.map((task) => (
                        <li 
                            key={task.id}
                            onClick={() => handleCheck(task.id)} // pass id directly
                            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer 
                                ${task.isCompleted ? "bg-green-100 line-through" : "bg-white"}
                            `}
                        >
                            {task.isCompleted ? "✅" : "⬜"} 
                            <span>{task.text}</span>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    //removeTask(task.id); // if using props
                                    dispatch(removeTask(task.id)); // redux way, add dispatch
                                }} 
                                className="text-red-500 hover:text-red-700"
                            >
                                ❌
                            </button>
                        </li>
                    ))   
                )}
            </ul>
        </div>
    )
}
export default TaskList;