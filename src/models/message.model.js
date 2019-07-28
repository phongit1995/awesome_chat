import mongoose from "mongoose" ;
let Schema = mongoose.Schema;
let MessageSchema = new Schema({
    sender:{
        id:String,
        username:String,
        avatar:String
    },
    receiver:{
        id:String,
        username:String,
        avatar:String
    },
    text:String,
    file:{data:Buffer, contenType:String, fileName:String},
    status:{type:Boolean, default:false},
    createAt:{type:Number,default:Date.now},
    updateAt:{type:Number,default:Date.now},
    deleteeAt:{type:Number,default:Date.now}
})
module.exports = mongoose.model("message",MessageSchema);