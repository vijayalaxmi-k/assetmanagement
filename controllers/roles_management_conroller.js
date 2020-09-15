
const Rolesmanagement = require("../models/roles_management_models");


exports.create=(req,res)=>{

    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    } 
     
     const rolesmanagement = new Rolesmanagement({
        
           
        module_id:req.body.module_id,
        perm_type_id:req.body.perm_type_id
      
        });
        
        Rolesmanagement.create(rolesmanagement,(err, data)=>{

            if(!req.body){
                res.status(400).send({
                    message:"Fill all the data"
                })
              
            }
         
           if(err)
                res.status(500).send({
                message: 
                err.message || "some error occured while creating the roles management."
            });
        
            else {
                res.send(data);            
                
            }
                
                   
            
        });
    

    

   
};

exports.findAll=(req,res)=>{
    Rolesmanagement.getAll((err, data) =>{
        if(err)
         res.status(500).send({
             message:
              err.message || "some error occured while retrieving the roles management "
         });
         else res.send(data);
    });
};


exports.deleteAll=(req,res)=>{
    Rolesmanagement.removeAll((err, data)=>{
        if(err)
         res.status(500).send({
             message:
             err.message || " Some error occured while removing all roles management."
         });
        else res.send({message :'All user were deleted successfully !'});
    });
};