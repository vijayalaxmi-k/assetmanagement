const Productmaster = require('../models/product_master_model');
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

     const productmaster = new Productmaster({
        product_name:req.body.product_name
    });
    sql.query("SELECT * FROM product_master where product_name = '"+req.body.product_name+"'",function(err,result){
        if(err) throw err;
        if(result.length > 0){
            res.send("Product name is already exist");
            console.log("Product name is aleredy exist")
        }else{
            Productmaster.create(productmaster,(err, data)=>{
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
    Productmaster.getAll((err,data)=>{
        if(err)
            res.status(500).send({
                message:err.message || "some error occured while retrieving "
            });
        else res.send(data);
    })
}

//find single record 
exports.findOne=(req,res)=>{
    Productmaster.findById(req.params.id, (err, data) =>{ //used in Productmaster_management_model findbyid 
     if(err){
         if(err.kind === "not_found"){
             res.status(404).send({
                 message :'Not found Productmaster with id.'+ req.params.id
             });

         }else{
             res.status(500).send({
                message :"error retriveing Productmaster with id " +req.params.id
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
    const productmaster = new Productmaster({
        product_name:req.body.product_name
    });
    Productmaster.updatedById(req.params.id,productmaster,(err, data) => { //used in Productmaster_management_model updatedById 
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message :'Not found Productmaster with id.'+ req.params.id
                });
   
            }else{
                res.status(500).send({
                   message :"error retriveing Productmaster with id " +req.params.id
                });
            }
            
        }else
                  
                res.send(data);
   
    });
};

//delete a single record

exports.delete=(req,res)=>{
    Productmaster.remove(req.params.id,(err,data)=>{ //used in Productmaster_management_model remove 
        
        if(err){
            if(err.kind === "not_found"){
                res.status(400).send({
                    message:'Not  found Productmaster with id .'+req.params.id
                });
            }else{
                res.status(500).send({
                    message: "could not delete Productmaster with id " +req.params.id
                });
            }
        }else res.send({message: 'Productmaster was deleted Successfully ! '});
    });
};

exports.deleteAll=(req,res)=>{
    Productmaster.removeAll((err, data)=>{
        if(err)
         res.status(500).send({
             message:
             err.message || " Some error occured while removing all Productmaster."
         });
        else res.send({message :'All Productmaster were deleted successfully !'});
    });
};





   


