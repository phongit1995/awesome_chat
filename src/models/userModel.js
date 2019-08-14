import mongoose from "mongoose" ;
let Schema = mongoose.Schema;
let UserSchema = new Schema({
    username: String,
    gender:{type:String,default:"male"},
    phone:{type:Number,default:null},
    address:{type:String,default:null},
    avatar:{type:String, default:"avatar-default.jpg"},
    role:{type:String,default:"user"},
    local:{
        email:{type:String,trim:true},
        password:String,
        isActive:{type:Boolean,default:false},
        veriftToken:String
    },
    facebook:{
        uid:String,
        token:String,
        email:{type:String, trim:true}
    },
    google:{
        uid:String,
        token:String,
        email:{type:String, trim:true}
    },
    createAt:{type:Number,default:Date.now},
    updateAt:{type:Number,default:null},
    deleteeAt:{type:Number,default:null}
})
UserSchema.statics ={
    createNew(item){
        return this.create(item);
 },
 findbyEmail(email){
     return this.findOne({"local.email":email}).exec();
 }
}
module.exports = mongoose.model("user",UserSchema);