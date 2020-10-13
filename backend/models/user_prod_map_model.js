const sql = require("../models/db");


//user management maping insert 

const UserManagementmap = function(usermap){
    this.group_id=usermap.group_id,
    this.branch_id=usermap.branch_id,
    this.product_id=usermap.product_id
}

UserManagementmap.createUser = async function(mapUser,result){
  
     sql.query('insert into user_prod_map SET ?',mapUser,(err,data)=>{
        if (err) {
            console.log("error :", err);
            result(err, null);
            return;
        }

        console.log("created User:", {
            id: data.insertId,
            ...mapUser
        });
        result(null, {
            id: data.insertId,
            ...mapUser
        });
    });

}


module.exports = UserManagementmap;