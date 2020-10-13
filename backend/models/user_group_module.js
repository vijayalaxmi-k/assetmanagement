const sql = require("../models/db");


const UserGroup = function(user){
    this.group_flag=user.group_flag,
    this.group_name=user.group_name
};

UserGroup.create =(newUser, result)=>{
        sql.query("INSERT INTO group_master SET ?", newUser,(err, res)=>{
            
            if(err){
                console.log("error :",err);
                result(err, null);
                return;
            }  
            
            console.log("created User group:",{id:res.insertId, ...newUser});
            result(null, {id:res.insertId, ...newUser});
        });
    


}
UserGroup.getAll = result =>{
    sql.query("SELECT * FROM group_master", (err, res) => {
        if(err){
            console.log("error :", err);
            result(null,err);
            return;
        }
        console.log("user group: ", res);
        result(null, res);
    });
};

UserGroup.updatedById = (id,user,result)=> {
    sql.query("UPDATE group_master SET  group_flag = ?,group_name = ? WHERE group_id = ?", [user.group_flag, user.group_name,id],
    (err,res)=>{
            if(err){
                console.log("error :", err);
                result(null,err);
                return;
            }
                if(res.affectedRows != 0){
                    console.log("updated user : ", {id: id, ...user});
                    result(null, {id: id, ...user});
                    
                }
                else{
                    result({kind: "not_found"}, null);
                    return;
                }
             
            
        
           
        }
    );
};


UserGroup.removeAll = result =>{
    sql.query("DELETE FROM group_master", (err, results)=>{
        if(err){
            console.log("error :", err);
            result(null,err);
            return;
        }
        console.log("user group: ", results);
        result(null, results);
        
    });
};

UserGroup.findById = (id, result,req)=>{
   
    sql.query('SELECT * FROM group_master WHERE group_id = ?', [id],(err,res)=>{
        if(err){
            console.log("error :", err);
            result(err,null);
            return;
        }else {
            if(res.length){
                console.log("found user : ", res[0]);
                result(null,res[0]);
                return;
            }
        }
            

        result({kind : "not_found"}, null);
    });
};


UserGroup.remove =(id,result) =>{
    sql.query("DELETE FROM group_master WHERE group_id = ?", [id], (err, res)=>{
        if(err){
            console.log("error :",err);
            result(null, err);
            return;
        }else{
            if(res.affectedRows !=0){
                
                console.log("Deleted user with id:", id);
                result(null,res);
            }
        }

        if(res.affectedRows == 0){
            result({kind : "not_found"}, null);
            return;

        }

        
    });
};

 
module.exports = UserGroup;

  