import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toggleTask, removeTask } from "../redux/tasksSlice";

const SortableTask = ({ task, dispatch }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

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
            <span
                {...attributes} // ARIA labels
                {...listeners} // Enable dragging
            >
                {task.text}
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
