import {validationResult} from 'express-validator';
import {auth} from '../services'
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
        let result = await auth.register(req.body.email,req.body.gender,req.body.password);
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
module.exports = {authLogin,authLogout,postRegister};