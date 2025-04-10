import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import { useDispatch } from 'react-redux';
import { fetchTasks } from './redux/tasksSlice';

import './App.css'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]); // include dispatch to satisfy React hook rules 

  return (
    <div>
    <h1 className='text-xl font-bold text-blue-500'>priority list</h1>
    <AddTaskForm />
    <TaskList />
  </div>
  )
}

export default App
