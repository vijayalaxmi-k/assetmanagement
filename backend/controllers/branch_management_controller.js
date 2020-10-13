const BranchMaster = require('../models/branch_management_model');
var sql = require('../models/db')

exports.create= (req,res)=>{
   
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    } 

    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d');
    var dates =  Date.now()
   // console.log(dates.format('Y-m-s H:S'))
    const branchmaster = new BranchMaster({
        branch_name:req.body.branch_name,
    });
    
    BranchMaster.create(branchmaster,(err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "some error occured while creating ."
            });
        }else {
            res.send(data);            
            console.log ("Insert success")
        }                         
    });      
                 
};

exports.findAll= async(req,res)=>{
    BranchMaster.getAll((err,data)=>{
        if(err)
            res.status(500).send({
                message:err.message || "some error occured while retrieving"
            });
        else res.send(data);
    })
}

//find single record 
exports.findOne=(req,res)=>{
    BranchMaster.findById(req.params.id, (err, data) =>{ //used in branch_management_model findbyid 
        if(err){
            if(err.kind === "not_found"){
                 res.status(404).send({
                     message :'Not found branch with id.'+ req.params.id
                  });
            }else{
                res.status(500).send({
                    message :"error retriveing branch with id " +req.params.id
                });
            }
        }else
             res.send(data);
    });
};

//update a record

exports.update=(req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });

    }
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d')
    const branchmaster = new BranchMaster({
        branch_name:req.body.branch_name,
    
    });
    
    BranchMaster.updatedById(req.params.id,branchmaster,(err, data) => { //used in branch_management_model updatedById 
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message :'Not found branch with id.'+ req.params.id
                });
   
            }else{
                res.status(500).send({
                   message :"error retriveing branch with id " +req.params.id
                });
            }
            
        }else         
            res.send(data);
    });
};

//delete a single record

exports.delete=(req,res)=>{
    BranchMaster.remove(req.params.id,(err,data)=>{ //used in branch_management_model remove 
        if(err){
            if(err.kind === "not_found"){
                res.status(400).send({
                    message:'Not  found branch with id .'+req.params.id
                });
            }else{
                res.status(500).send({
                    message: "could not delete branch with id " +req.params.id
                });
            }
        }else res.send({message: 'branch was deleted Successfully ! '});
    });
};

exports.deleteAll=(req,res)=>{
    BranchMaster.removeAll((err, data)=>{
        if(err)
            res.status(500).send({
                message:
                err.message || " Some error occured while removing all branch."
            });
        else res.send({message :'All branch were deleted successfully !'});
    });
};





   

