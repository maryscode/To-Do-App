
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // access Redux state
import { toggleTask, removeTask } from "../redux/tasksSlice";
import { DndContext, closestCenter, DragOverlay} from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableTask from "./SortableTask"; // default
import { reorderTasks } from "../redux/tasksSlice";

const TaskList = () => {

    // get tasks from redux state
    const {tasks, status, error} = useSelector((state) => state.tasks);

    const dispatch = useDispatch(); // get Redux dispatch fn
    const [filter, setFilter] = useState('');
    const [activeTask, setActiveTask] = useState(null);

    // Filter tasks
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.isCompleted === true;
        if (filter === 'incomplete') return task.isCompleted === false;
        return true;
    })
    
    const handleDragStart = (event) => {
        const draggedTask = tasks.find(task => task.id === event.active.id);
        setActiveTask(draggedTask);
    }

    // Function to update Redux when tasks are reordered
    const handleDragEnd = (event) => {
        console.log("Drag Ended:", event);
        setActiveTask(null); // clear dragged item

        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = tasks.findIndex(task => task.id === active.id);
        const newIndex = tasks.findIndex(task => task.id === over.id)

        const newTasks = arrayMove(tasks,oldIndex,newIndex);

        dispatch(reorderTasks(newTasks));
    };
    
    const handleCheck = (taskID) => {
        dispatch(toggleTask(taskID)); // toggle complete❌
    };


    // Stop render and return early if loading status is: 
    if (status === 'loading') return <p>Loading tasks...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    return ( 
        <DndContext 
            collisionDetection={closestCenter} 
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd} // 
        >
            <h2>Filter</h2>
            <button onClick={(e) => setFilter('all')} >Show All</button>
            <button onClick={(e) => setFilter('completed')} >Show Completed</button>
            <button onClick={(e) => setFilter('incomplete')} >Show Incomplete</button>

            <h2>Task list</h2>

            <SortableContext 
                items={tasks.map(task => task.id)} 
                strategy={verticalListSortingStrategy}>
                <ul className="list-none">
                    {tasks.length === 0 ? (
                        <p>No tasks yet!</p>
                    ) : (
                        filteredTasks.map((task) => (
                            <SortableTask key={task.id} task={task} dispatch={dispatch} />
                        ))   
                    )}
                </ul>
            </SortableContext>

            <DragOverlay>
                {activeTask ? (
                    <div className="p-3 border rounded-lg bg-gray-200 opacity-90">
                        DRAGGED: {activeTask.text}
                    </div>
                ): null }
            </DragOverlay>

            <div className="flex mt-10">
                <span className="flex-1 bg-blue-200">To Do</span>
                <span className="flex-1 bg-green-200">Doing</span>
                <span className="flex-1 bg-red-200">Completed</span>
            </div>
        </DndContext>
    )
}
export default TaskList;