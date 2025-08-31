import React from 'react'
import { Check, Pencil, Trash2, X } from 'lucide-react'
import axios from 'axios'

const TodoList = ({
    todos,
    editingTodo,
    editedText,
    setEditedText,
    setEditingTodo,
    setTodos
}) => {


    const startEditing = (todo) => {
        setEditingTodo(todo._id)
        setEditedText(todo.text)
    }

    const saveEdit = async (id) => {
        try {
            const response = await axios.patch(`/api/todos/${id}`, { text: editedText })
            setTodos(todos.map((todo) =>
                todo._id === id ? { ...todo, text: response.data.text } : todo
            ))
            setEditingTodo(null)

        } catch (err) {
            console.log(err.message)
        }
    }

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`/api/todos/${id}`)
            setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id))

        } catch (err) {
            console.log(err.message)
        }
    }

    const toggleTodo = async (id) => {
        const todo = todos.find((t) => t._id === id)
        const response = await axios.patch(`/api/todos/${id}`, {completed: !todo.completed})
        setTodos(todos.map(t => t._id === id ? response.data : t))
    }

    return (
        <div className='mt-4'>
            {todos.length === 0 ? (
                <div className="text-gray-500 text-center py-4">
        No todos yet 🎉
    </div>
            ) : (
                <div className='flex flex-col gap-4'>
                    {todos.map(todo =>
                        <div key={todo._id}>
                            {editingTodo === todo._id ? (
                                <div className='flex items-center gap-3'>
                                    <input type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} className='p-3 border border-gray-200 flex-1 rounded-md outline-none focus:ring-2 focus:ring-blue-300 text-gray-500 shadow-inner' />
                                    <div className='flex items-center gap-x-2'>
                                        <button className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer' onClick={() => saveEdit(todo._id)}>{<Check />}</button>
                                        <button onClick={() => setEditingTodo(null)} className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer'>{<X />}</button>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-x-4 overflow-hidden'>
                                        <button onClick={() => toggleTodo(todo._id)} className={`h-6 w-6 rounded-full border flex items-center justify-center flex-shrink-0 ${todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-blue-400'}`}>{todo.completed && <Check size={20} />}</button>
                                        <span className='text-gray-800 font-medium truncate'> {todo.text}</span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <button onClick={() => startEditing(todo)} className='p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 duration-200'>{<Pencil />}</button>
                                        <button className='p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 duration-200' onClick={() => deleteTodo(todo._id)}>{<Trash2 />}</button>
                                    </div>
                                </div>
                            )}
                        </div>)}
                </div>
            )}
        </div>
    )
}

export default TodoList