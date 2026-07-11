import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

async function connectDB(){

    try {
        const connectionInstance = mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Succefully Connected to DB Host ${(await connectionInstance).connection.host}`);
        
        } catch (error) {
        console.log("ERROR Connecting to DB: ", error);
        process.exit(1);
    }

}

export default connectDB;