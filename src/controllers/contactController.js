import {Contact} from '../services/index'; 

let findAllContact = async (req,res)=>{
    try{
        let keyword = req.params.keyword;
         let usersfindcontact=  await Contact.findUserAcount(req.user._id,keyword);
          res.status(200).send(usersfindcontact);
    }
    catch(error){
        res.status(500).send(erro);
    }
    
}
let addnewContact = async (req,res)=>{
    try{
        let CurrentID = req.user._id ;
        let UseraddID = req.body.id;
        let contact = await Contact.addNew(CurrentID,UseraddID);
        res.status(200).send({sucess:!!contact});

    }catch(erro){

        return res.status(500).send(erro);
    }
}
let removeContact =  async( req,res)=>{
    try{
        let CurrentID = req.user._id ;
        let UseraddID = req.body.id;
        let contact = await Contact.removeContact(CurrentID,UseraddID);
        res.status(200).send({sucess:!!contact});

    }catch(erro){
 
        return res.status(500).send(erro);
    }
}
module.exports ={
    findAllContact,
    addnewContact,
    removeContact
}