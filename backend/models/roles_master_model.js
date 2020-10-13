const sql = require("../models/db");


const Rolemaster = function(roles){
    this.role_name=roles.role_name
};

Rolemaster.create =(newrole, result)=>{
   
    
        sql.query("INSERT INTO role_master SET ?", newrole,(err, res)=>{
            
            if(err){
                console.log("error :",err);
                result(err, null);
                return;
            }  
            
            console.log("created role :",{id:res.insertId, ...newrole});
            result(null, {id:res.insertId, ...newrole});
        });
    


}
Rolemaster.getAll = result =>{
    sql.query("SELECT * FROM role_master", (err, res) => {
        if(err){
            console.log("error :", err);
            result(null,err);
            return;
        }
        console.log("role: ", res);
        result(null, res);
    });
};

Rolemaster.updatedById = (id,role,result)=> {
    sql.query("UPDATE role_master SET  role_name = ? WHERE role_id = ?", [role.role_name,id],
    (err,res)=>{
            if(err){
                console.log("error :", err);
                result(null,err);
                return;
            }
                if(res.affectedRows != 0){
                    console.log("updated role : ", {id: id, ...role});
                    result(null, {id: id, ...role});
                    
                }
                else{
                    result({kind: "not_found"}, null);
                    return;
                }
             
            
        
           
        }
    );
};


Rolemaster.removeAll = result =>{
    sql.query("DELETE FROM role_master", (err, results)=>{
        if(err){
            console.log("error :", err);
            result(null,err);
            return;
        }
        console.log("role : ", results);
        result(null, results);
        
    });
};

Rolemaster.findById = (id, result,req)=>{
   
    sql.query('SELECT * FROM role_master WHERE role_id = ?', [id],(err,res)=>{
        if(err){
            console.log("error :", err);
            result(err,null);
            return;
        }else {
            if(res.length){
                console.log("found role : ", res[0]);
                result(null,res[0]);
                return;
            }
        }
            

        result({kind : "not_found"}, null);
    });
};


Rolemaster.remove =(id,result) =>{
    sql.query("DELETE FROM role_master WHERE role_id = ?", [id], (err, res)=>{
        if(err){
            console.log("error :",err);
            result(null, err);
            return;
        }else{
            if(res.affectedRows !=0){
                
                console.log("Deleted role with id:", id);
                result(null,res);
            }
        }

        if(res.affectedRows == 0){
            result({kind : "not_found"}, null);
            return;

        }

        
    });
};

 
module.exports = Rolemaster;

  