const Rolemaster = require("../models/roles_master_model");
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
   
     const rolemaster = new Rolemaster({
            role_name:req.body.role_name
        });
        sql.query("SELECT * FROM role_master where role_name = '"+req.body.role_name+"'",function(err,result){
            if(err) throw err;
            if(result.length > 0){
                res.send("Role name is already exist");
                console.log("Role name is aleredy exist")
            }else{
                Rolemaster.create(rolemaster,(err, data)=>{
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
    Rolemaster.getAll((err, data) =>{
        if(err)
         res.status(500).send({
             message:
              err.message || "some error occured while retrieving  "
         });
         else res.send(data);
    });
};

//find single record 
exports.findOne=(req,res)=>{
    Rolemaster.findById(req.params.id, (err, data) =>{ //used in role_management_model findbyid 
     if(err){
         if(err.kind === "not_found"){
             res.status(404).send({
                 message :'Not found role with id.'+ req.params.id
             });

         }else{
             res.status(500).send({
                message :"error retriveing role with id " +req.params.id
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
    const rolemaster = new Rolemaster({
        role_name:req.body.role_name
    });
    Rolemaster.updatedById(req.params.id,rolemaster,(err, data) => { //used in role_management_model updatedById 
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message :'Not found role with id.'+ req.params.id
                });
   
            }else{
                res.status(500).send({
                   message :"error retriveing role with id " +req.params.id
                });
            }
            
        }else
                  
                res.send(data);
   
    });
};

//delete a single record

exports.delete=(req,res)=>{
    Rolemaster.remove(req.params.id,(err,data)=>{ //used in role_management_model remove 
        
        if(err){
            if(err.kind === "not_found"){
                res.status(400).send({
                    message:'Not  found role with id .'+req.params.id
                });
            }else{
                res.status(500).send({
                    message: "could not delete role with id " +req.params.id
                });
            }
        }else res.send({message: 'role was deleted Successfully ! '});
    });
};

exports.deleteAll=(req,res)=>{
    Rolemaster.removeAll((err, data)=>{
        if(err)
         res.status(500).send({
             message:
             err.message || " Some error occured while removing all role."
         });
        else res.send({message :'All role were deleted successfully !'});
    });
};





   

