import passport from 'passport';
import passportLocal from 'passport-local';
import UserModel from '../../models/userModel';
import {transErrors,transSucces} from '../../../lang/vi';
let LocalStrategy = passportLocal.Strategy;

let initPassportLocal = ()=>{
    passport.use(new LocalStrategy({
        usernameField:"email",
        passwordField:"password",
        passReqToCallback:true
    }, async (req,email,password,done)=>{
        try{
            let user = await UserModel.findbyEmail(email);
            if(!user){
                return done(null,false,req.flash("errors",transErrors.login_failed));
            }
            if(!user.local.isActive){
                return done(null,false,req.flash("errors",transErrors.account_not_active));
            }
            let checkpassword = await user.conparepassword(password);
            if(!checkpassword){
                return done(null,false,req.flash("errors",transErrors.login_failed));
            }
            return done(null,user,req.flash('success',transSucces.login_succes(user.username)));
        }
        catch(erro){
            return done(null,false,req.flash("errors",transErrors.server_erro));
        }
    }))
    passport.serializeUser((user,done)=>{
        done(null,user._id);
    })
    passport.deserializeUser((id,done)=>{
        UserModel.findById(id).then(user=>{
            return done(null,user);
        }).catch(erro=>{
            return done(erro,null);
        })
    })
}
module.exports = initPassportLocal;