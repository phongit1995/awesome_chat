import express from "express";
import configViewEngine from './config/viewEngine';
import DBConnect from "./config/connectdb";
import InitRouter  from './routers/web';
require('dotenv').config()
let app = express();
DBConnect();
configViewEngine(app);
InitRouter(app);

app.listen(process.env.APP_PORT,()=>{
    console.log("Đang Chạy Trên Port :" + process.env.APP_PORT);
});