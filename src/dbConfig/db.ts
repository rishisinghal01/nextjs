import mongoose  from "mongoose";


export async function connect() {
    try {
        mongoose.connect(process.env.mongo_url!)

        const connection  = mongoose.connection;

        connection.on("connected",()=>{
            console.log("MongoDb connected successfully")
        })
        connection.on("error",(err)=>{
            console.log("MongoDb connection error. Please make sure MongoDB is running."+err);
            process.exit();
        })
    } catch (error) {
        console.log(error)
    }
}