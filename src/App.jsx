import { useState } from 'react'
import TaskList from './components/TaskList'
import AddTaskForm from './components/AddTaskForm'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <h1>To-Do App</h1>
    <AddTaskForm />
    <TaskList />
  </div>
  )
}

export default App
