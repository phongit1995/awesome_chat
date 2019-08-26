import UserModel from './../models/userModel';
import {transErrors,transSucces} from '../../lang/vi';
import bcrypt from 'bcrypt';
const saltRound=7;
let updateUser= (id,item)=>{
    return UserModel.updateUser(id,item);
}
let updatePassUser = (id,item)=>{
return new Promise( async(resolve,reject)=>{
    let currentUser = await UserModel.findUserById(id);
    if(!currentUser){
        return reject(transErrors.account_undefined);
    }
    let checkpassword = await currentUser.conparepassword(item.currentPass);
    if(!checkpassword){
        return reject(transErrors.account_password_fail);
    }
    let salt = bcrypt.genSaltSync(saltRound);
    await UserModel.updatePassWord(id, bcrypt.hashSync(item.newPass,salt));
    resolve(transSucces.change_pass_sucess);
})
}
module.exports = {
    updateUser:updateUser,
    updatePassUser
}