import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
import todoRoutes from "./routes/todo.routes.js";
import path from "path";
const app = express();
const dbUrl = process.env.DB_URL_LOCAL;
const port = process.env.PORT || 3000;



// Middleware
app.use(express.json());
app.use("/api/todos", todoRoutes);



// Get __dirname in ES module
const __dirname = path.resolve();



// Production static files
if (process.env.NODE_ENV === "production") {
    const frontendDist = path.join(__dirname, "../frontend/dist");
    app.use(express.static(frontendDist));

    // Catch-all route for React SPA
    app.get("/*", (req, res) => {
        res.sendFile(path.join(frontendDist, "index.html"));
    });
}



// Start server
const startServer = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("Connected to database");
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.log("Internal error:", error.message);
        process.exit(1);
    }
};

startServer();