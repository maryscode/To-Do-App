# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


** Drag and Drop
This project uses dnd-kit for drag-and-drop task reordering. This allows users to rearrange tasks intuitively while maintaining smooth performance and accessibility.

How It Works
Draggable tasks: Each task can be dragged and repositioned.
Droppable list: The task list is reorderable using dnd-kit/sortable.
Redux integration: The task order updates in Redux when dragging ends.

** Functionality
* Add tasks
* Toggle complete tasks
* Delete tasks
* Filter tasks

# Mock db
Fake API endpoint available in db.json: http://localhost:4000/tasks


# Run App
Start mock api: 
`npm run server`

In a separate terminal:

`npm run dev`