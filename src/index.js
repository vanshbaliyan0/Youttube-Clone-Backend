import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path:'./env'
})

connectDB()













/*
import express from "express"
const app = express()
( async () => {     //This is an Immediately Invoked Async Function Expression (IIFE).It runs automatically when the code starts, so you can use await inside it.
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) //Connects your app to a MongoDB database.The URI is taken from environment variable process.env.MONGODB_URI and a database name DB_NAME.
        app.on("error", (error) => {  //Listens for errors on the Express app.
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {  //Starts the server on a given port (from environment variable PORT).Logs a message once the server is running.
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) { //If any error happens in the try block, it will be caught here.It logs the error.Problem: it uses throw err, but err is undefined. It should be throw error.
        console.error("ERROR: ", error)
        throw err
    }
})()

*/