import React, { useEffect, useState } from 'react'
import Form from './components/Form.jsx'
import axios from 'axios'
import TodoList from './components/TodoList.jsx'
// import TodoList from './components/TodoList.jsx'

const App = () => {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [editingTodo, setEditingTodo] = useState(null)
  const [editedText, setEditedText] = useState('')

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/todos')
      setTodos(response.data)
    } catch (err) {
      console.log('Error fetching data', err.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className='min-h-screen flex justify-center items-center p-4'>
      <div className='shadow-xl w-full max-w-lg p-8 rounded-lg'>
        <h1 className='text-center font-bold text-4xl mb-4'>Task Manager</h1>
        <Form newTodo={newTodo} setNewTodo={setNewTodo} todos={todos} setTodos={setTodos} />
        < TodoList todos={todos} editingTodo={editingTodo} editedText={editedText} setEditedText={setEditedText} setEditingTodo={setEditingTodo} setTodos={setTodos}/>
      </div>
    </div>
  )
}

export default App