import mongoose from "mongoose";

let connectDB = ()=>{
    mongoose.Promise = es6Promise.Promise;
    let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    console.log(URI);
    return mongoose.connect(URI,{useMongoClient:true});
    
};
module.exports = connectDB;
