import multer  from 'multer';
import {validationResult} from 'express-validator';
import {configapp} from '../config/app';
import {transErrors,transSucces} from '../../lang/vi';
import uuidv4 from 'uuid/v4';
import {User} from '../services';
import fsExtra from 'fs-extra';
let storageAvatar= multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,configapp.avatar_derectory);
    },
    filename:(req,file,callback)=>{
        let math= configapp.avatar_type;
        if(math.indexOf(file.mimetype)===-1){
            return callback(transErrors.avatar_type,null);
        }
        let avatarName = `${Date.now()}-${uuidv4()}-${file.originalname}`;
        callback(null,avatarName);
    }
})
let avatarUploadFile = multer({storage:storageAvatar, limits:{fieldSize:configapp.avatar_limit_file}}).single("avatar");
let updateAvatar = (req,res)=>{
    avatarUploadFile(req,res, async (erro)=>{
      
        if(erro){
            if(erro.message){
                 return res.status(500).send(transErrors.avatar_size);
            }
           return  res.status(500).send(transErrors.avatar_type);
            
            }
        try{
            let updateUserItem={
                avatar:req.file.filename,
                updateAt:Date.now()
            }
           let userUpdate = await User.updateUser(req.user._id,updateUserItem);
           //await fsExtra.remove(`${configapp.avatar_derectory}/${userUpdate.avatar}`);
           let result = {
               message:transSucces.Avatar_updated,
               imageSrc:`/images/users/${req.file.filename}`
           }
            return res.status(200).send(result);
        }
        catch(erro){
            console.log(erro);
            return res.status(500).send(erro);
        }
});
}
let updateInfo =  async (req,res)=>{
    let validationErros = validationResult(req);
    let erroArr=[];
    if(!validationErros.isEmpty()){
        let errors = Object.values(validationErros.mapped());
        errors.forEach((value)=>{
            erroArr.push(value.msg);
        })
        
        return res.status(500).send(erroArr);
    }
     try{
        let updateUserItem = req.body;
        let user = await User.updateUser(req.user._id,updateUserItem);
        
        let result = {
            message:transSucces.Avatar_updated,
        }
         return res.status(200).send(result)
     }
     catch (erro){
         return res.status(500).send(erro);
     }
}
module.exports = {
    updateAvatar:updateAvatar,
    updateInfo:updateInfo
}