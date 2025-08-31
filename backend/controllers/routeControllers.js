import Todo from '../models/todo.model.js'

const getController = async (req, res) => {
    try {
        const todos = await Todo.find()
        res.status(200).json(todos)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const postController = async (req, res) => {
    try{
        const newTodo = await Todo.create({text: req.body.text})
        res.status(201).json(newTodo)
    } catch(err){
        console.log(err)
        res.status(400).json({message: err.message})
    }
}

const patchController = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
        if(!todo) return res.status(400).json({message: 'No todo found!'})

        if(req.body.text !== undefined){
            todo.text = req.body.text
        }

        if(req.body.completed !== undefined){
            todo.completed = req.body.completed
        }

        const updatedTodo = await todo.save()
        res.status(200).json(updatedTodo)

    } catch (err) {
        console.log(err.message)
        res.status(401).json({ error: err.message })
    }
}

const deleteController = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id)

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" })
        }

        res.status(200).json({ message: "Todo deleted", id: req.params.id })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
}


export default {
    getController,
    postController,
    patchController,
    deleteController
}