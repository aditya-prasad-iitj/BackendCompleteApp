import 'dotenv/config'
import mongoose from "mongoose"
import { DB_NAME } from "./constants.js";
import connectDB from './db/index.js';


connectDB();


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