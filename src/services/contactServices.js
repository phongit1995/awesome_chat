import contactModel from '../models/contactModel';
import userModel from '../models/userModel' ;
import _ from "lodash";
let findUserAcount = async (UserID , Keyword)=>{
    return new Promise( async (reslove,reject)=>{
        let deprecreateUserID =[];
        let contactByUser = await contactModel.findAlltByUser(UserID);
        if(contactByUser){
            contactByUser.forEach((contact)=>{
                deprecreateUserID.push(contact.userID);
                deprecreateUserID.push(contact.contactID);
            })
        }
      
        let deprecreateUserIDs = _.uniqBy(deprecreateUserID);
        let users = await userModel.findAllForAddContact(deprecreateUserIDs,Keyword);
        reslove(users);
    })
}
let addNew = ( CurrentID ,IDadd)=>{
    return new Promise( async (reslove,reject)=>{
        let contactExits = await contactModel.checkExits(CurrentID,IDadd);
        if(contactExits.length>0){
            return  reject(false);
        }
        let contactItem ={
            userID:CurrentID,
            contactID:IDadd
        }
        let contactadd = await contactModel.createNew(contactItem);
       
        reslove(contactadd);
        
    })
}
let removeContact = ( CurrentID ,IDadd)=>{
    return new Promise ( async(reslove,reject)=>{
        let contact = await contactModel.removeContact(CurrentID,IDadd);
  
        reslove(true);
    })
}
module.exports ={
    findUserAcount:findUserAcount,
    addNew:addNew,
    removeContact:removeContact
}