import mongoose from "mongoose" ;
let Schema = mongoose.Schema;
let ChatGroupSchema = new Schema({
    name:String,
    userAmount:{type:Number,min:3,max:177},
    messageAmount:{type:Number,default:0},
    userID:String,
    members:[
        {userID:String}
    ]
    ,
    createAt:{type:Number,default:Date.now},
    updateAt:{type:Number,default:Date.now},
    deleteeAt:{type:Number,default:Date.now}
})
module.exports = mongoose.model("chat-group",ChatGroupSchema);