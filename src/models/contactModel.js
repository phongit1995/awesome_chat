
import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let ContactSchema = new Schema({
    userID:String,
    contactID:String,
    status:{type:Boolean, default:false},
    createAt:{type:Number,default:Date.now},
    updateAt:{type:Number,default:null},
    deleteeAt:{type:Number,default:null}
})
ContactSchema.statics ={
    createNew(item){
        return this.create(item);
    },
    findAlltByUser(userid){
         return this.find({
             $or:[
                 {"userID":userid},
                 {"contactID":userid}
             ]
         }
         ).exec();
    },
    checkExits(userId,contactID){
        return this.find(
        {
            $or:[
                {
                    $and:[
                        {"userID":userId},
                        {"contactID":contactID}
                    ]
                },
                {
                    $and:[
                        {"userID":contactID},
                        {"contactID":userId}
                    ]
                }
            ]
        }).exec();
    },removeContact(userID,contactID){
        return this.deleteOne({
            "userID":userID,"contactID":contactID
        }).exec();
    }
}
module.exports = mongoose.model("contact",ContactSchema);