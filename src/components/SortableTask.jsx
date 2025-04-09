import { useState, useRef, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toggleTask, removeTask, editTask } from "../redux/tasksSlice";


const SortableTask = ({ task, dispatch }) => {
    const [editText, setEditText] = useState(false);
    const [taskText, setTaskText] = useState(task.title);

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

    const inputRef = useRef(null);

    useEffect(() => {
        if(editText && inputRef.current){
            inputRef.current.focus(); // Focus input
        }
    },[editText])

    const handleTextBlur = (e) => {
        setEditText(false);
        dispatch(editTask({id: task.id, text: taskText}))
    }
    const handleTextKeyDown = (e) => {
        if (e.key === 'Enter'){
            handleTextBlur();
        }
    }
    const handleTextClick = (e) => {
        e.stopPropagation(); // STOPS from parent li click
        console.log('text clicked! ' + inputRef.current)
        setEditText(editText ? false : true);
        
    }
    return (
        <li 
            ref={setNodeRef} // Attach drag functionality

            style={{ transform: CSS.Transform.toString(transform), transition }} // visually moves the item
            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer 
                ${task.isCompleted ? "bg-green-100 line-through" : "bg-white"}
            `}
        >
            <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={(e) => {
                    e.stopPropagation(); // STOPS DRAGGING
                    dispatch(toggleTask(task.id))
                }}
            />

            
                {editText ? (
                        <input
                            ref={inputRef}
                            className="flex-2 bg-teal-100" 
                            type="text"
                            //onClick={(e) => e.stopPropagation()}
                            onKeyDown={handleTextKeyDown}
                            onChange={(e) => {setTaskText(e.target.value)}}
                            value={taskText}
                            onBlur={handleTextBlur}
                            
                        />
                        // save value as state
                    ) : (
                        <span 
                            tabIndex="0"
                            className="flex-1 h-10 flex items-center ml-1"
                            onKeyDown={handleTextClick}
                            onClick={handleTextClick}
                        >
                            {taskText}
                        </span>
                    )
                } 
                
        
            <span
                {...attributes} // ARIA labels
                {...listeners} // Enable dragging
            >
               ☰
            </span>

            
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeTask(task.id));
                }} 
                className="text-red-500 hover:text-red-700"
            >
                ❌
            </button>
        </li>
    );
};

export default SortableTask;
