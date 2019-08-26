import mongoose from "mongoose" ;
import bcrypt from 'bcrypt';
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
 },
 removeId(id){
     return this.findByIdAndRemove(id);
 },
 findByToken(token){
    return this.findOne({
        "local.veriftToken":token
    });
 },
 verify(token){
     return this.findOneAndUpdate({
         "local.veriftToken":token
     },{
         "local.isActive":true,
         "local.veriftToken":null
     },{useFindAndModify: false}).exec();
 },
 findUserById(id){
     return this.findById(id).exec();
 },
 findByFbUserID(uid){
    return this.findOne({"facebook.uid":uid}).exec();
 },
 updateUser(id,item){
     return this.findByIdAndUpdate(id,item).exec();
 },
 updatePassWord(id,pass){
     return this.findByIdAndUpdate(id,{"local.password":pass}).exec();
 },
 findAllForAddContact(deprecreateUserIDs,Keyword){
     return this.find({
         $and:[
             {"_id":{$nin:deprecreateUserIDs}},
             {"local.isActive":true},
             {
                $or:[
                    {"username":{"$regex": new RegExp(Keyword,"i") }},
                    {"local.email":{"$regex":new RegExp(Keyword,"i")}},
                    {"facebook.email":{"$regex":new RegExp(Keyword,"i")}},
                    {"google.email":{"$regex":new RegExp(Keyword,"i")}}
                ]
             }

         ]
     },{_id:1,username:1,avatar:1,address:1}).exec();
 }
}
UserSchema.methods={
    conparepassword(password){
        return bcrypt.compare(password,this.local.password);
    }
}
module.exports = mongoose.model("user",UserSchema);