import mongoose from "mongoose";

const connectToMongo = async  () =>
    {
           const res = await mongoose.connect("mongodb+srv://bhaveshvaniya102:SecureWeb%4020@secureweb.h1aho5k.mongodb.net/myappdb?retryWrites=true&w=majority&appName=secureweb");
           if(res)
            {
                console.log("Connected successfully");
            }
    };
export default connectToMongo;

