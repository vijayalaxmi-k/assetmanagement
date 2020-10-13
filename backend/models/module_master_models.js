const sql = require("./db");

const ModuleMaster = function(modulemaster){
    this.product_id=modulemaster.product_id,
    this.module_name=modulemaster.module_name
};

ModuleMaster.create =(newModuleMasters, result)=>{
   
        sql.query("INSERT INTO module_master SET ?", newModuleMasters,(err, res)=>{
            
            if(err){
                console.log("error :",err);
                result(err, null);
                return;
            }  
            
            console.log("created new ModuleMasters:",{id:res.insertId, ...newModuleMasters});
            result(null, {id:res.insertId, ...newModuleMasters});
        });
    
   

}

ModuleMaster.getAll = result =>{
    sql.query("SELECT * FROM module_master M, product_master P where M.product_id = P.product_id", (err, res) => {
        if(err){
            console.log("error :", err);
            result(null,err);
            return;
        }
        console.log("ModuleMaster: ", res);
        result(null, res);
    });
};

ModuleMaster.updatedById = (id,modulemaster,result)=> {
    
    sql.query("UPDATE module_master SET product_id = ?, module_name = ? WHERE module_id = ?", [modulemaster.product_id,modulemaster.module_name,id],
    (err,res)=>{
            if(err){
                console.log("error :", err);
                result(null,err);
                return;
            }
                if(res.affectedRows != 0){
                    console.log("updated ModuleMaster : ", {id: id, ...modulemaster});
                    result(null, {id: id, ...modulemaster});
                    
                }
                else{
                    result({kind: "not_found"}, null);
                    return;
                }
             
            
        
           
        }
    );
};


ModuleMaster.removeAll = result =>{
    sql.query("DELETE FROM module_master", (err, results)=>{
        if(err){
            console.log("error :", err);
            result(null,err);
            return;
        }
        console.log("ModuleMaster : ", results);
        result(null, results);
        
    });
};

ModuleMaster.findById = (id, result,req)=>{
   
    sql.query('SELECT * FROM module_master WHERE module_id = ?', [id],(err,res)=>{
        if(err){
            console.log("error :", err);
            result(err,null);
            return;
        }else {
            if(res.length){
                console.log("found ModuleMaster : ", res[0]);
                result(null,res[0]);
                return;
            }
        }
            

        result({kind : "not_found"}, null);
    });
};


ModuleMaster.remove =(id,result) =>{
    sql.query("DELETE FROM module_master WHERE module_id = ?", [id], (err, res)=>{
        if(err){
            console.log("error :",err);
            result(null, err);
            return;
        }else{
            if(res.affectedRows !=0){
                
                console.log("Deleted ModuleMaster with id:", id);
                result(null,res);
            }
        }

        if(res.affectedRows == 0){
            result({kind : "not_found"}, null);
            return;

        }

        
    });
};

module.exports = ModuleMaster;

  
   
  
   