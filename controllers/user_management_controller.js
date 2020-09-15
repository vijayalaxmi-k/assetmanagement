var connection = require('../models/db')
var bcrypt = require('bcrypt');
const User = require("../models/user_management_model");
//const Users = require("../models/user_management");
var md5 = require('md5');
exports.create=(req,res)=>{
    //const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    } 
     

        var firstname = req.body.firstname;
        var lastname   =req.body.lastname;
        var email = req.body.email;
        var contact = req.body.contact;
        var password = md5(req.body.password);
        var confirmpwd = md5(req.body.confirmpwd);
        //  usergroup :  req.body.usergroup,
        var dept_branch_id =req.body.dept_branch_id;
        var dept_id=req.body.dept_id;
        var active = req.body.active;
        var confirmed =req.body.confirmed;
        //assoc_role:req.body.assoc_role,
        var mod_per_id =req.body.mod_per_id;
        var role_perm_id=req.body.role_perm_id;
    

        
     
    connection.query('select * from user_management where email= "'+email+'" ',function(err,result){
        if (err) throw err;
        if (result.length>0){
             res.send("user already registered");
        }else{
    
            connection.query('insert into user_management(firstname, lastname, email, contact, password,confirmpwd,dept_branch_id,dept_id,active,confirmed,mod_per_id,role_perm_id) VALUES("' + firstname + '","' + lastname + '","' + email + '",' + contact + ',"' + password + '","' + confirmpwd + '",' + dept_branch_id + ',' + dept_id + ',' + active + ',' + confirmed + ',' + mod_per_id + ',' + role_perm_id + ')',
            function(err,rows,fields){
                if(err) throw err;
                else {
                    console.log(rows);
                    res.send("inserted");

                }
            });
         }
    });

   
};

exports.findAll=(req,res)=>{
    User.getAll((err, data) =>{
        if(err)
         res.status(500).send({
             message:
              err.message || "some error occured while retrieving the user "
         });
         else res.send(data);
    });
};

/*exports.findOne=(req,res)=>{
    User.findById(req.params.userId, (err, data) =>{
        console.log(req.params);
     if(err){
         if(err.kind === "not_found"){
             res.status(404).send({
                 message :'Not found user with id ${req.params.parentId}.'
             });

         }else{
             res.status(500).send({
                message :"error retriveing user with id " +req.params.parentId
             });
         }
         
     }else
               
                res.send(data);

 });
};

exports.update=(req,res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty !"
        });

    }

    User.updatedById(req.params.userId,new User(req.body),(err, data) => {
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
    Users.remove(req.params.userId,(err,data)=>{
        if(err){
            if(err.kind === "not_find"){
                res.status(400).send({
                    message:'Not  found user with id ${req.params.userId}.'
                });
            }else{
                res.status(500).send({
                    message: "could not delete user with id " +req.params.userId
                });
            }
        }else res.send({message: 'user was deleted Successfully ! '});
    });
};*/

exports.deleteAll=(req,res)=>{
    User.removeAll((err, data)=>{
        if(err)
         res.status(500).send({
             message:
             err.message || " Some error occured while removing all user."
         });
        else res.send({message :'All user were deleted successfully !'});
    });
};


exports.login = async function(req,res){
    var email= req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM user_management WHERE email = ?',[email], async function (error, results, fields) {
        if (error) {
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      }else{
        if(results.length !=0){
            console.log(results[0]['password']);
            console.log(md5(password));
            if(results[0]['password'] === md5(password))
            {
              res.send({
                "code":200,
                "success":"login sucessfull"
              })
          }
          else{
            res.send({
                 "code":204,
                 "success":"Email and password does not match"
            })
          }
        }
        else{
          res.send({
            "code":206,
            "success":"Email does not exits"
              });
        }
      }
      });
  }