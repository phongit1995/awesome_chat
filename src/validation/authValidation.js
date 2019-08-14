import {check} from 'express-validator';
import {transValidation} from '../../lang/vi';
let register=[
    check("email",transValidation.email_incorrect).isEmail().trim(),
    check("gender",transValidation.gender_incorrect).isIn(["male","female"]),
    check("password",transValidation.password_incorrect).isLength({min:8}).matches(``),
    check("password_confirmation",transValidation.password_confirm_incorrect).custom((value,{req})=>{
        return value===req.body.password;
    })

];
module.exports = {register:register};