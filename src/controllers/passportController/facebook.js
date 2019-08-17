import passport from 'passport';
require('dotenv').config();
import passportFacebook from 'passport-facebook';
import UserModel from '../../models/userModel';
import {transErrors,transSucces} from '../../../lang/vi';
let FacebookStrategy = passportFacebook.Strategy;
let FB_APP_ID = process.env.FB_APP_ID;
let FB_APP_SECRET= process.env.FB_APP_SECRET;
let FB_APP_URL = process.env.FB_CALLBACK_URL;
let initPassportFacebook = ()=>{
    passport.use(new FacebookStrategy({
        clientID:FB_APP_ID,
        clientSecret:FB_APP_SECRET,
        callbackURL:FB_APP_URL,
        passReqToCallback:true,
        profileFields:["email","gender","displayName"]
    }, async (req,accesToken,refreshToken,profile,done)=>{
        try{
            let user = await UserModel.findByFbUserID(profile.id);
            if(user){
                return done(null,user,req.flash('success',transSucces.login_succes(user.username)));
            }
            let newUserItem={
                username:profile.displayName,
                gender:profile.gender,
                local:{ isActive:true},
                facebook:{
                    uid:profile.id,
                    token:accesToken,
                    email:profile.emails[0].value
                }
            }
            let newUser = await UserModel.createNew(newUserItem);
            return done(null,newUser,req.flash('success',transSucces.login_succes(user.username)));
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
module.exports = initPassportFacebook;