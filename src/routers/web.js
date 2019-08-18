import express  from 'express';
import {auth, Home,User} from '../controllers';
import passport from 'passport';
import initPassportLocal from '../controllers/passportController/local';
import initPassportFacebook from '../controllers/passportController/facebook';
initPassportFacebook();
initPassportLocal();
let router = express.Router();
import {authValida,userValida} from './../validation'
let initRouter = (app)=>{
    router.get("/",auth.CheckloggedIn,Home);
    router.get("/login",auth.CheckloggedOut, auth.authLogin);
    // xác nhận email
    router.get('/verify/:token',auth.verfyAccount);
    router.post("/register",auth.CheckloggedOut,authValida.register,auth.postRegister);
    router.post("/login",passport.authenticate("local",{
        successRedirect:"/",
        failureRedirect:"/login",
        successFlash:true,
        failureFlash:true
    }))
    router.get('/auth/facebook',passport.authenticate("facebook",{scope:["email"]}));
    router.get("/auth/facebook/callback",passport.authenticate("facebook",{
        successRedirect:"/",
        failureRedirect:"/login",
    }))
    router.get("/logout",auth.CheckloggedIn,auth.getLogout);
    router.put('/user/update-avatar',auth.CheckloggedIn,User.updateAvatar);
    router.put('/user/update-info',auth.CheckloggedIn,userValida.updateInfo,User.updateInfo);
    return app.use("/",router);
}
module.exports = initRouter;