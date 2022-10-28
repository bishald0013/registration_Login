import dotenv from "dotenv"
dotenv.config()
import express, { json } from "express"
import cors from "cors"
import connectDB from "./config/connectDB.js"
import userRouter from "./routes/userRouter.js"

const app = express()
const port = process.env.PORT

//Database URL
const DATABASE_URL = process.env.DATABASE_URL

// Cors policy
app.use(cors())

//Database connection
connectDB(DATABASE_URL)

//For using JSON file
app.use(express.json())

//Load Routes
app.use("/api/user", userRouter)


app.listen(port, ()=>{
    console.log(`server is running at https://localhost:${port}`); 
})