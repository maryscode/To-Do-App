import { useState } from 'react'
import TaskList from './components/TaskList'
import AddTaskForm from './components/AddTaskForm'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <h1 className='text-xl font-bold text-blue-500'>priority list</h1>
    <AddTaskForm />
    <TaskList />
  </div>
  )
}

export default App
