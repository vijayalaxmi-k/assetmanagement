const PermissionType = require('../models/permission_type_model');
var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d');
var sql = require('../models/db')
exports.create= (req,res)=>{
   
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    } 

     const permissiontype = new PermissionType({
        role_id:req.body.role_id,
        permission_type:req.body.permission_type
    });
      
    sql.query("SELECT * FROM permission_type_master where permission_type = '"+req.body.permission_type+"'",function(err,result){
        if(err) throw err;
        if(result.length > 0){
            res.send("Permission type is already exist");
            console.log("Permission type is aleredy exist")
        }else{
            PermissionType.create(permissiontype,(err, data)=>{
                if(err)
                     res.status(500).send({
                         message: 
                             err.message || "some error occured while creating ."
                     });
                             
                 else {
                        res.send(data);            
                        console.log ("Insert success")
                 }
                                     
            });

        }
    })
        
              
   
};

exports.findAll=(req,res)=>{
    PermissionType.getAll((err,data)=>{
        if(err)
            res.status(500).send({
                message:err.message || "some error occured while retrieving "
            });
        else res.send(data);
    })
}

//find single record 
exports.findOne=(req,res)=>{
    PermissionType.findById(req.params.id, (err, data) =>{ //used in PermissionType_management_model findbyid 
     if(err){
         if(err.kind === "not_found"){
             res.status(404).send({
                 message :'Not found PermissionType with id.'+ req.params.id
             });

         }else{
             res.status(500).send({
                message :"error retriveing PermissionType with id " +req.params.id
             });
         }
         
     }else
               
             res.send(data);

 });
};

//update a record

exports.update=async(req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });

    }
    const permissiontype = new PermissionType({
        role_id:req.body.role_id,
        permission_type:req.body.permission_type
    });
    console.log(formatted)
    PermissionType.updatedById(req.params.id,permissiontype,(err, data) => { //used in PermissionType_management_model updatedById 
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message :'Not found PermissionType with id.'+ req.params.id
                });
   
            }else{
                res.status(500).send({
                   message :"error retriveing PermissionType with id " +req.params.id
                });
            }
            
        }else
                  
                res.send(data);
   
    });
};

//delete a single record

exports.delete=(req,res)=>{
    PermissionType.remove(req.params.id,(err,data)=>{ //used in PermissionType_management_model remove 
        
        if(err){
            if(err.kind === "not_found"){
                res.status(400).send({
                    message:'Not  found PermissionType with id .'+req.params.id
                });
            }else{
                res.status(500).send({
                    message: "could not delete PermissionType with id " +req.params.id
                });
            }
        }else res.send({message: 'PermissionType was deleted Successfully ! '});
    });
};

exports.deleteAll=(req,res)=>{
    PermissionType.removeAll((err, data)=>{
        if(err)
         res.status(500).send({
             message:
             err.message || " Some error occured while removing all PermissionType."
         });
        else res.send({message :'All PermissionType were deleted successfully !'});
    });
};





   


