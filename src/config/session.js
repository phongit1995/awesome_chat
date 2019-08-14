import session from 'express-session';
import connectMongo from 'connect-mongo';
let MongoStore = connectMongo(session);
require('dotenv').config();

let sessionStore = new MongoStore({
    url:`${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    autoReconnect:true
})
let configSession = (app)=>{
    app.use(session({
        key:"express.sid",
        secret:"Phong Đinh Nguyễn",
        resave:true,
        store:sessionStore,
        saveUninitialized:false,
        cookie:{
            maxAge:1000*60*60*24*15
        }

    }))
}
module.exports = configSession;