import express from "express";
import configViewEngine from './config/viewEngine';
import DBConnect from "./config/connectdb";
require('dotenv').config()
let app = express();
DBConnect();
configViewEngine(app);
app.get("/",(req,res)=>{
    res.render("main/master");
})
app.get("/login", async(req,res)=>{
    res.render('auth/loginRegister');
})
app.listen(process.env.APP_PORT,()=>{
    console.log("Đang Chạy Trên Port :" + process.env.APP_PORT);
});