import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv()
import todoRoutes from "./routes/todo.routes.js";
import path from 'path'

const app = express()
const dbUrl = process.env.DB_URL_LOCAL
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/api/todos', todoRoutes)

const __dirname = path.resolve()

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "index.html"))
    })
}
const startServer =  async() => {
    try{
        await mongoose.connect(dbUrl)
        console.log('connected to database')
        app.listen(port, () => {
            console.log('Server running on port 3000')
        })
    } catch(error){
        console.log('Internal error', error.message)
        process.exit(1)
    }
}

startServer()