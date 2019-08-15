import {validationResult} from 'express-validator';
import {auth} from '../services';
import {transSucces} from './../../lang/vi';
let authLogin = (req,res)=>{
        var obj={
            errors:req.flash("errors"),
            success:req.flash("success")
    }
    res.render('auth/master',obj);
}
let authLogout = (req,res)=>{

}
let postRegister=  async(req,res)=>{
    let erroArr=[];
    let succesArr=[];
    let validationErros = validationResult(req);
    if(!validationErros.isEmpty()){
        let errors = Object.values(validationErros.mapped());
        errors.forEach((value)=>{
            erroArr.push(value.msg);
        })
        
        req.flash('errors',erroArr);
        return res.redirect('/login');
    }
    try{
        let result = await auth.register(req.body.email,req.body.gender,req.body.password,req.protocol,req.get('host'));
        succesArr.push(result);
        req.flash('success',succesArr);
    }
    catch (erro){
        erroArr.push(erro);
        req.flash('errors',erroArr);
    }
    
    return res.redirect('/login');
     
   console.log(req.body);
}
let verfyAccount = async (req,res)=>{
    let erroArr=[];
    let succesArr=[];
    try {
        let VeryfyStatus = await auth.VerifyAccount(req.params.token);
        succesArr.push(VeryfyStatus);
        req.flash('success',succesArr);
    } catch (error) {
        erroArr.push(error);
        req.flash('errors',erroArr);
    }
    return res.redirect('/login');
}
let getLogout = (req,res)=>{
    req.logout();
    req.flash("success",transSucces.logout_success);
    return res.redirect('/login');
}
let CheckloggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
}
let CheckloggedOut=(req,res,next)=>{
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    next();
}
module.exports = {authLogin,authLogout,postRegister,verfyAccount,getLogout,CheckloggedIn,CheckloggedOut};