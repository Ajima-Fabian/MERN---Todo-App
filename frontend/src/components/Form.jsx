import React from 'react'
import axios from 'axios'

const Form = ({newTodo, setNewTodo, todos, setTodos}) => {

  const handleTodoChange = (e) => {
    setNewTodo(e.target.value)
  }

  const addTodo = async (e) => {
    e.preventDefault()
    
    if(!newTodo.trim()) return

    try{
      const response = await axios.post('/api/todos', {text: newTodo})
      setTodos([...todos, response.data])
      setNewTodo('')
      console.log(todos)
    } catch(err){
      console.log( 'Error adding todo',err)
    }
  }

  return (
    <form className='flex items-center gap-2 shadow-sm border border-gray-200 p-2 rounded-lg' onSubmit={addTodo}>
      <input type="text" value={newTodo} className='outline-none  px-3 py-2 flex-1' placeholder='Enter your task here...' onChange={handleTodoChange}/>
      <button className='bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600' type='submit'>Add Task</button>
    </form>
  )
}

export default Form