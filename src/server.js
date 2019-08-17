require('dotenv').config();
import express from "express";
import configViewEngine from './config/viewEngine';
import DBConnect from "./config/connectdb";
import InitRouter  from './routers/web';
import bodyparser from 'body-parser';
import Connectflash from 'connect-flash';
import configSession from './config/session';
import passport  from 'passport';
import pem from 'pem';
import https from 'https';
// (async () => {
//   // add this if statement
//   if (os.platform() === 'win32') {
//     process.env.OPENSSL_CONF = path.join(__dirname, 'openssl', 'windows', 'openssl.cnf')
//     pem.config({
//       pathOpenSSL: path.join(__dirname, 'openssl', 'windows', 'openssl.exe'),
//     })
//   }
// }
// )
// pem.config({
//   pathOpenSSL: 'C:\\Users\\Phong\\ssl\\bin\\openssl'
// })

// pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
//     if (err) {
//       throw err
//     }
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
    
  //   https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(process.env.APP_PORT,()=>{
  //       console.log("Đang Chạy Trên Port :" + process.env.APP_PORT);
  //   });
  // })


app.listen(process.env.APP_PORT,()=>{
    console.log("Đang Chạy Trên Port :" + process.env.APP_PORT);
});