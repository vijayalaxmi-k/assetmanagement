const Users = require("../models/user_prod_map_model");

//user managaement map export function
exports.createUsermap = (req,res)=>{
    const usermap =  new Users({
           group_id :req.body.group_id,
           branch_id:req.body.branch_id,
           product_id:req.body.product_id
    }) 
    
    Users.createUser(usermap,(err,data)=>{
       if (err)
           res.status(500).send({
               message: err.message || "some error occured while creating the usre."
           });

       else {
           res.send(data);
           console.log("Insert success usermap")
       }

    })
}
