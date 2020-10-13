const ModuleMaster = require("../models/module_master_models");
var sql = require('../models/db')
exports.create= (req,res)=>{
   
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    } 

     const modulemaster = new ModuleMaster({
        product_id:req.body.product_id,
        module_name:req.body.module_name
      
    });
    sql.query("SELECT * FROM module_master where module_name = '"+req.body.module_name+"'",function(err,result){
        if(err) throw err;
        if(result.length > 0){
            res.send("Module name is already exist");
            console.log("Module name is aleredy exist")
        }else{
            ModuleMaster.create(modulemaster,(err, data)=>{
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
    ModuleMaster.getAll((err, data) =>{
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
    ModuleMaster.findById(req.params.id, (err, data) =>{ //used in ModuleMaster_management_model findbyid 
     if(err){
         if(err.kind === "not_found"){
             res.status(404).send({
                 message :'Not found ModuleMaster with id.'+ req.params.id
             });

         }else{
             res.status(500).send({
                message :"error retriveing ModuleMaster with id " +req.params.id
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
    var dateTime =  require("node-datetime");
    var dt = dateTime.create();
    var formatted =  dt.format("Y-m-d")
    const modulemaster = new ModuleMaster({
        product_id:req.body.product_id,
        module_name:req.body.module_name
    });
    ModuleMaster.updatedById(req.params.id,modulemaster,(err, data) => { //used in ModuleMaster_management_model updatedById 
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message :'Not found ModuleMaster with id.'+ req.params.id
                });
   
            }else{
                res.status(500).send({
                   message :"error retriveing ModuleMaster with id " +req.params.id
                });
            }
            
        }else
                  
                res.send(data);
   
    });
};

//delete a single record

exports.delete=(req,res)=>{
    ModuleMaster.remove(req.params.id,(err,data)=>{ //used in ModuleMaster_management_model remove 
        
        if(err){
            if(err.kind === "not_found"){
                res.status(400).send({
                    message:'Not  found ModuleMaster with id .'+req.params.id
                });
            }else{
                res.status(500).send({
                    message: "could not delete ModuleMaster with id " +req.params.id
                });
            }
        }else res.send({message: 'ModuleMaster was deleted Successfully ! '});
    });
};

exports.deleteAll=(req,res)=>{
    ModuleMaster.removeAll((err, data)=>{
        if(err)
         res.status(500).send({
             message:
             err.message || " Some error occured while removing all ModuleMaster."
         });
        else res.send({message :'All ModuleMaster were deleted successfully !'});
    });
};





   

