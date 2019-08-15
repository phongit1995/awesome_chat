require('dotenv').config();
import express from "express";
import configViewEngine from './config/viewEngine';
import DBConnect from "./config/connectdb";
import InitRouter  from './routers/web';
import bodyparser from 'body-parser';
import Connectflash from 'connect-flash';
import configSession from './config/session';
import passport  from 'passport';

let app = express();
DBConnect();
configViewEngine(app);
app.use(bodyparser.urlencoded({extended:true}));
configSession(app);
// Enable flash message
app.use(Connectflash());
// Config Session
app.use(passport.initialize());
app.use(passport.session());
InitRouter(app);

app.listen(process.env.APP_PORT,()=>{
    console.log("Đang Chạy Trên Port :" + process.env.APP_PORT);
});