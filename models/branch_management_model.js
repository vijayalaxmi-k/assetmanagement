const sql = require("../models/db");
const { threadId } = require("../models/db");

const Branchmanagement = function(branchmanagement){

    this.branch_name=branchmanagement.branch_name
    this.dept_display_name=branchmanagement.dept_display_name

};

Branchmanagement.create =(newbranch, result)=>{
   
        sql.query("INSERT INTO branch_master SET ?", newbranch,(err, res)=>{
            
            if(err){
                console.log("error :",err);
                result(err, null);
                return;
            }  
            
            console.log("created new branch:",{id:res.insertId, ...newbranch});
            result(null, {id:res.insertId, ...newbranch});
        });
    
   

}
Branchmanagement.getAll = result =>{
    sql.query("SELECT * FROM branch_master", (err, res) => {
        if(err){
            console.log("error :", err);
            result(null,err);
            return;
        }
        console.log("Branch: ", res);
        result(null, res);
    });
};



Branchmanagement.removeAll = result =>{
    sql.query("Delete from branch_master", (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        console.log('deleted ${res.affectedRows} new branch');
        result(null,res);
    });
};

module.exports = Branchmanagement;

  
   