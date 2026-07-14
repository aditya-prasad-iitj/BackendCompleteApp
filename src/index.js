import 'dotenv/config'
import mongoose from "mongoose"
import { DB_NAME } from "./constants.js";
import connectDB from './db/index.js';
import { app } from './app.js';

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log("App listening on Port ", process.env.PORT);
    })
})
.catch((err)=>{
    console.log("Couldn't connect MongoDB: ", err);
    
})

/*
import express from "express"
const app = express()

( async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("ERROR: ", error);
            throw error;
        })

        app.listen(process.env.PORT || 4000, ()=>{
            console.log(`App is listening on Port :${process.env.PORT || 4000}`);
            
        })
    } catch (error) {
        console.log("Error connecting Database, with Error: ", error);
    }
})()
*/