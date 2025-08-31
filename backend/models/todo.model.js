import mongoose from "mongoose";

const todoShema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Todo = mongoose.model('todo', todoShema)

export default Todo