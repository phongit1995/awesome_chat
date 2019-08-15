import UserModel from '../models/userModel'
import bcrypt from 'bcrypt';
import uuidv4 from 'uuid/v4';
import {transErrors,transSucces,transEmail} from '../../lang/vi';
import sendMail from '../config/mailer';
let saltRounds = 7 ;
let register =  (email,gender,password,protocol,host)=>{
    return new Promise( async (resolve,reject)=>{
        let UserByEmail = await UserModel.findbyEmail(email);
        if(UserByEmail){
            if(UserByEmail.deleteeAt!= null){
                return  reject(transErrors.account_removed);
            }
            if(!UserByEmail.local.isActive){
                return  reject(transErrors.account_not_active);
            }
            return  reject(transErrors.account_in_use);
        }
        let salt =  bcrypt.genSaltSync(saltRounds);
        let userItem={
            username:email.split("@")[0],
            gender:gender,
            local:{
                email:email,
                password:bcrypt.hashSync(password,salt),
                veriftToken:uuidv4()
            }
    
        }
        let user = await UserModel.createNew(userItem);
        // SEND EMAIL 
        let LinkVerify = `${protocol}://${host}/verify/${user.local.veriftToken}`;
        sendMail(email,transEmail.subject,transEmail.template(LinkVerify)).then(succes=>{
            resolve(transSucces.Usercreated(user.local.email));
        }).catch( async erro=>{
            // Nếu Gửi Mail Bị Lỗi Xóa Người Dùng
            console.log(erro);
            await UserModel.removeId(user._id);
            reject(transEmail.send_mail_fail);
            
        });
        
        
    })
   
}
let VerifyAccount = (token)=>{
    return new Promise( async(resolve,reject)=>{
        let userbytoken = await UserModel.findByToken(token);
        if(!userbytoken){
            return reject(transErrors.token_undefine);
        }
         let user = await UserModel.verify(token);
         console.log(user);
        resolve(transSucces.Account_active);
        
    })
}
module.exports= {
    register:register,
    VerifyAccount:VerifyAccount
}