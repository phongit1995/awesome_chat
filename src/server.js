import express from "express";
require('dotenv').config()
let app = express();
app.get("/",(req,res)=>{
    res.send("Phong Nguyễn");
})
app.listen(process.env.APP_PORT,()=>{
    console.log("Đang Chạy Trên Port :" + process.env.APP_PORT);
});