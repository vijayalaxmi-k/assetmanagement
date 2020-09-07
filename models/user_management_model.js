const mysql = require('mysql')
const sql = require('../dbconnection/db.connection');

const UserManaagement = function(user){
   // this.user_id=user.user_id
    this.firstname = user.firstname
    this.lastname   = user.lastname
    this.email = user.email
    this.contact = user.contact
    this.password = user.password
    this.confirmpwd = user.confirmpwd
    this.usergroup =  user.usergroup
    this.assoc_branch = user.assoc_branch
    this.active = user.active
    this.confirmed = user.confirmed
    this.assoc_role=user.assoc_role
    this.assoc_permission = user.assoc_permission
    this.perm_id=user.perm_id
    this.role_id=user.role_id

}


    
  //const sendconformemail = req.body.sendconformemail
UserManaagement.create =(newuser, result)=>{
 
    sql.query("INSERT INTO user_management SET ?", newuser,(err, res)=>{
        
        if(err){
            console.log("error :",err);
            result(err, null);
            return;
        }  
        
        console.log("created user:",{user_id:res.insertId, ...newuser});
        result(null, {user_id:res.insertId, ...newuser});
    });
   
}

UserManaagement.findById = (userId, result)=>{
    
    sql.query('SELECT * FROM user_management WHERE user_id =?',[userId],(err,res)=>{
        if(err){
            console.log("error :", err);
            result(err,null);
            return;
        }
        
        if(res.length>0){
            console.log("found user : ", res[0]);
            result(null,res[0]);
            return;
        }

        result({kind : "not_found"}, null);
    });
};

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

UserManaagement.updatedById = (userId,user,result)=> {
    sql.query("UPDATE user_management SET firstname = ?,lastname = ?,email =?,contact=?,password=?,confirmpwd=?,usergroup=? ,assoc_branch=?,active=?,confirmed=?,assoc_role=?,assoc_permission=?,perm_id=?,role_id=? WHERE user_id=?",[user.firstname,user.lastname,user.email,user.contact,user.password, user.confirmpwd,user.usergroup,user.assoc_branch,user.active,user.confirmed,user.assoc_branch,user.assoc_role,user.assoc_permission,user.perm_id,user.role_id,userId],
    (err,res)=>{
            if(err){
                console.log("error :", err);
                result(null,err);
                return;
            }

            if(res.affectedRows == 0){
                result({kind: "not_found"}, null);
                return;
            }

            console.log("updated user : ", {user_id: userId, ...user});
            result(null, {user_id: userId, ...user});
        }
    );
};

UserManaagement.remove =(userId,result,req) =>{
    sql.query("DELETE FROM user_management WHERE user_id = ?",[userId], (err, res)=>{
        if(err){
            console.log("error :",err);
            result(null, err);
            return;
        }

        if(res.affectedRows == 0){
            result({kind : "not_found"}, null);
            return;

        }

        console.log("Deleted user with user_id:", userId);
        result(null,res);
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



   
   