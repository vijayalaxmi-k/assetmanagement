var sql = require('./db');

const PermissionType = function(permissiontype){
    this.role_id=permissiontype.role_id,
    this.permission_type= permissiontype.permission_type   
};

PermissionType.create =(newPermissionType, result)=>{
       
        sql.query("INSERT INTO permission_type_master SET ?", newPermissionType,(err, res)=>{
            
            if(err){
                console.log("error :",err);
                result(err, null);
                return;
            }  
            
            console.log("created PermissionType :",{id:res.insertId, ...newPermissionType});
            result(null, {id:res.insertId, ...newPermissionType});
        });
    


}
PermissionType.getAll = result=>{
    sql.query("SELECT * FROM permission_type_master P, role_master R where P.role_id=R.role_id",(err,res)=>{
        if(err){
            console.log("error :",err);
            result(null,err);
            return;
        }
        console.log("PermissionType master :", res);
        result(null,res);
    })
}


PermissionType.updatedById = (id,permissiontype,result)=> {
   this.updated_on = permissiontype.updated_on
   console.log(permissiontype.updated_on)
    sql.query("UPDATE permission_type_master SET  role_id = ?, permission_type = ? WHERE perm_id = ?", [permissiontype.role_id, permissiontype.permission_type,id],
    (err,res)=>{
            if(err){
                console.log("error :", err);
                result(null,err);
                return;
            }
                if(res.affectedRows != 0){
                    console.log("updated PermissionType master : ", {id: id, ...permissiontype});
                    result(null, {id: id, ...permissiontype});
                    
                }
                else{
                    result({kind: "not_found"}, null);
                    return;
                }
             
            
        
           
        }
    );
};


PermissionType.removeAll = result =>{
    sql.query("DELETE FROM permission_type_master", (err, results)=>{
        if(err){
            console.log("error :", err);
            result(null,err);
            return;
        }
        console.log("PermissionType : ", results);
        result(null, results);
        
    });
};

PermissionType.findById = (id, result,req)=>{
   
    sql.query('SELECT * FROM permission_type_master WHERE perm_id = ?', [id],(err,res)=>{
        if(err){
            console.log("error :", err);
            result(err,null);
            return;
        }else {
            if(res.length){
                console.log("found PermissionType : ", res[0]);
                result(null,res[0]);
                return;
            }
        }
            

        result({kind : "not_found"}, null);
    });
};


PermissionType.remove =(id,result) =>{
    sql.query("DELETE FROM permission_type_master WHERE perm_id = ?", [id], (err, res)=>{
        if(err){
            console.log("error :",err);
            result(null, err);
            return;
        }else{
            if(res.affectedRows !=0){
                
                console.log("Deleted PermissionType with id:", id);
                result(null,res);
            }
        }

        if(res.affectedRows == 0){
            result({kind : "not_found"}, null);
            return;

        }

        
    });
};

 
module.exports = PermissionType;

  