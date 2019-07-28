
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
    }
}
module.exports = mongoose.model("contact",ContactSchema);