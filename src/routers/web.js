import express  from 'express';
import {auth, Home} from '../controllers';
let router = express.Router();
import {authValida} from './../validation'
let initRouter = (app)=>{
    router.get("/",Home);
    router.get("/login", auth.authLogin);
    // xác nhận email
    router.get('/verify/:token',auth.verfyAccount);
    router.post("/register",authValida.register,auth.postRegister);
    return app.use("/",router);
}
module.exports = initRouter;