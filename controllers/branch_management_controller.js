
const Branchmanagement = require("../models/branch_management_model");


exports.create=(req,res)=>{
    
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    } 
     
    
     const branchmanagement = new Branchmanagement({
        
           
        branch_name:req.body.branch_name,
        dept_display_name:req.body.dept_display_name
    });
        
        Branchmanagement.create(branchmanagement,(err, data)=>{

            if(!req.body){
                res.status(400).send({
                    message:"Fill all the data"
                })
              
            }
         
           if(err)
                res.status(500).send({
                message: 
                err.message || "some error occured while creating the branch management."
            });
        
            else {
                res.send(data);            
                
            }
                
                   
            
        });
    

    

   
};

exports.findAll=(req,res)=>{
    Branchmanagement.getAll((err, data) =>{
        if(err)
         res.status(500).send({
             message:
              err.message || "some error occured while retrieving the branch management "
         });
         else res.send(data);
    });
};


exports.deleteAll=(req,res)=>{
    Branchmanagement.removeAll((err, data)=>{
        if(err)
         res.status(500).send({
             message:
             err.message || " Some error occured while removing all branch management."
         });
        else res.send({message :'All user were deleted successfully !'});
    });
};