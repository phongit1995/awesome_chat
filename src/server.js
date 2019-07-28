import express from "express";
import ContactModel from "./models/contact.model";
import DBConnect from "./config/connectdb";
require('dotenv').config()
let app = express();
DBConnect();
app.get("/",(req,res)=>{
    res.send("Phong Nguyễn");
})
app.get("/test", async(req,res)=>{
    try{
        let item ={
            userID:"phong",
            contactID:"Nguyen"
        }
        let contact = await ContactModel.createNew(item);
        console.log(contact);
        res.send("Phong" + contact);

    }
    catch(erro){
        Console.log(erro);
    }
})
app.listen(process.env.APP_PORT,()=>{
    console.log("Đang Chạy Trên Port :" + process.env.APP_PORT);
});