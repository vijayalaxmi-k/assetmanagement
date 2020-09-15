const sql = require("../models/db");
var bcrypt = require('bcrypt');
var md5 = require('md5');
const UserManaagement = function(user){
   
    this.firstname = user.firstname
    this.lastname   = user.lastname
    this.email = user.email
    this.contact = user.contact
    this.password = user.password
    this.confirmpwd = user.confirmpwd
    this.dept_id=user.dept_id
    this.dept_branch_id=user.dept_branch_id
    this.active = user.active
    this.confirmed = user.confirmed
   // this.assoc_role=user.assoc_role
    this.mod_per_id=user.mod_per_id
    this.role_perm_id=user.role_perm_id


};

/*UserManaagement.create =(newUser, result,req)=>{
   
        sql.query("INSERT INTO user_management SET ?", newUser,(err, res)=>{
            
            if(err){
                console.log("error :",err);
                result(err, null);
                return;
            }  
            
            console.log("created user:",{id:res.insertId, ...newUser});
            result(null, {id:res.insertId, ...newUser});
                        
        });
    
     
    }*/
   
        
   


UserManaagement.getAll = result =>{
    sql.query("SELECT * FROM user_management", (err, res) => {
        if(err){
            console.log("error :", err);
            result(null,err);
            return;
        }
        console.log("users: ", res);
        result(null, res);
    });
};



UserManaagement.removeAll = result =>{
    sql.query("Delete from user_management", (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        console.log('deleted ${res.affectedRows} user');
        result(null,res);
    });
};
module.exports = UserManaagement;

  
   