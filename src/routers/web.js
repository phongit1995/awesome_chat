import express  from 'express';
import {auth, Home} from '../controllers';
import passport from 'passport';
import initPassportLocal from '../controllers/passportController/local';
initPassportLocal();
let router = express.Router();
import {authValida} from './../validation'
let initRouter = (app)=>{
    router.get("/",Home);
    router.get("/login", auth.authLogin);
    // xác nhận email
    router.get('/verify/:token',auth.verfyAccount);
    router.post("/register",authValida.register,auth.postRegister);
    router.post("/login",passport.authenticate("local",{
        successRedirect:"/",
        failureRedirect:"/login",
        successFlash:true,
        failureFlash:true
    }))
    return app.use("/",router);
}
module.exports = initRouter;