import express from "express"
import cors from "cors"
import task from "./routers/task.js"
import {connect} from "./configuration/dbConnection.js"


const app=express()
const port=3000

connect()
app.use(express.json())
app.use(cors())
app.use('/',task)

app.listen(port,()=>{
    console.log("Server is running on 3000");
})