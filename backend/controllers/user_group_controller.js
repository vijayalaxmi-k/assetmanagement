const UserGroup = require("../models/user_group_module");
var dateTime =  require('node-datetime');
var dt = dateTime.create();
var formatted =  dt.format('Y-m-d')
var sql = require('../models/db')
exports.create= async(req,res)=>{
   
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    } 

     const usergroup = new UserGroup({
            group_flag:req.body.group_flag,
            group_name:req.body.group_name
        });
      
        sql.query("SELECT * FROM group_master where group_name = '"+req.body.group_name+"'",function(err,result){
            if(err) throw err;
            if(result.length > 0){
                res.send("Group name is already exist");
                console.log("Group name is aleredy exist")
            }else{
                UserGroup.create(usergroup,(err, data)=>{
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
    UserGroup.getAll((err, data) =>{
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
    UserGroup.findById(req.params.id, (err, data) =>{ //used in user_management_model findbyid 
     if(err){
         if(err.kind === "not_found"){
             res.status(404).send({
                 message :'Not found user with id.'+ req.params.id
             });

         }else{
             res.status(500).send({
                message :"error retriveing user with id " +req.params.id
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
    const usergroup = new UserGroup({
        group_flag:req.body.group_flag,
        group_name:req.body.group_name
    });
    UserGroup.updatedById(req.params.id,usergroup,(err, data) => { //used in user_management_model updatedById 
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message :'Not found user with id.'+ req.params.id
                });
   
            }else{
                res.status(500).send({
                   message :"error retriveing user with id " +req.params.id
                });
            }
            
        }else
                  
                res.send(data);
   
    });
};

//delete a single record

exports.delete=(req,res)=>{
    UserGroup.remove(req.params.id,(err,data)=>{ //used in user_management_model remove 
        
        if(err){
            if(err.kind === "not_found"){
                res.status(400).send({
                    message:'Not  found user with id .'+req.params.id
                });
            }else{
                res.status(500).send({
                    message: "could not delete user with id " +req.params.id
                });
            }
        }else res.send({message: 'user was deleted Successfully ! '});
    });
};

exports.deleteAll=(req,res)=>{
    UserGroup.removeAll((err, data)=>{
        if(err)
         res.status(500).send({
             message:
             err.message || " Some error occured while removing all user."
         });
        else res.send({message :'All user were deleted successfully !'});
    });
};





   

