import UserModel from '../models/userModel'
import bcrypt from 'bcrypt';
import uuidv4 from 'uuid/v4';
import {transErrors,transSucces} from '../../lang/vi';
let saltRounds = 7 ;
let register =  (email,gender,password)=>{
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
        resolve(transSucces.Usercreated(user.local.email));
    })
   
}
module.exports= {
    register:register
}