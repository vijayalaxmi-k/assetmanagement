
//const User = require("../models/user_management_model");
const UserManaagement = require("../models/user_management_model");

exports.create=(req,res)=>{
  //  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
   
        const user = new UserManaagement({
           
            firstname : req.body.firstname,
            lastname   :req.body.lastname,
            email : req.body.email,
            contact : req.body.contact,
            password : req.body.password,
            confirmpwd : req.body.confirmpwd,
            usergroup :  req.body.usergroup,
            assoc_branch : req.body.assoc_branch,
            active : req.body.active,
            confirmed : req.body.confirmed,
            assoc_role:req.body.assoc_role,
            assoc_permission : req.body.assoc_permission,
            perm_id : req.body.perm_id,
            role_id:req.body.role_id
        });
        
        User.create(user,(err, data)=>{
         
           if(err)
                res.status(500).send({
                message: 
                err.message || "some error occured while creating the user."
            });
        
            else {
                res.send(data);            
                
            }        
            
        });
};

exports.findAll=(req,res)=>{
    UserManaagement.getAll((err, data) =>{
        if(err)
         res.status(500).send({
             message:
              err.message || "some error occured while retrieving the user "
         });
         else res.send(data);
    });
};

exports.findOne=(req,res)=>{
    UserManaagement.findById(req.params.userId, (err, data) =>{
     if(err){
         if(err.kind === "not_found"){
             res.status(404).send({
                 message :'Not found user with id ${req.params.userId}.'
             });

         }else{
             res.status(500).send({
                message :"error retriveing user with id " +req.params.userId
             });
         }
         
     }else res.send(data);

 });
};

exports.update=(req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });

    }

    UserManaagement.updatedById(req.params.userId,new UserManaagement(req.body),(err, data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: 'Not found user with id ${req.params.userId}.'
                    });
                }else{
                    res.status(500).send({
                        message:"Error updating user with id " +req.params.userId
                    });
                }
            }else res.send(data);
        }
    );
};

exports.delete=(req,res)=>{
    UserManaagement.remove(req.params.userId,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(400).send({
                    message:'Not  found user with id ${req.params.userId}.'
                });
            }else{
                res.status(500).send({
                    message: "could not delete user with id " +req.params.userId
                });
            }
        }else res.send({message: 'User was deleted Successfully ! '+req.params.userId});
    });
};

exports.deleteAll=(req,res)=>{
    UserManaagement.removeAll((err, data)=>{
        if(err)
         res.status(500).send({
             message:
             err.message || " Some error occured while removing all user."
         });
        else res.send({message :'All User were deleted successfully !'});
    });
};
