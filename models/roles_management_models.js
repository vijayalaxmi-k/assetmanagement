const sql = require("../models/db");
var bcrypt = require('bcrypt');
var md5 = require('md5');
const Rolesmanagement = function(rolesmanagement){

    
    this.module_permission=rolesmanagement.module_id
    this.associated_asset=rolesmanagement.perm_type_id


};

Rolesmanagement.create =(newRoles, result)=>{
   
        sql.query("INSERT INTO roles_management SET ?", newRoles,(err, res)=>{
            
            if(err){
                console.log("error :",err);
                result(err, null);
                return;
            }  
            
            console.log("created new Roles:",{id:res.insertId, ...newRoles});
            result(null, {id:res.insertId, ...newRoles});
        });
    
   

}
Rolesmanagement.getAll = result =>{
    sql.query("SELECT * FROM roles_management", (err, res) => {
        if(err){
            console.log("error :", err);
            result(null,err);
            return;
        }
        console.log("Roles: ", res);
        result(null, res);
    });
};




Rolesmanagement.removeAll = result =>{
    sql.query("Delete from roles_management", (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        console.log('deleted ${res.affectedRows} newRoles');
        result(null,res);
    });
};

module.exports = Rolesmanagement;

  
   