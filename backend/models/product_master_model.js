var sql = require('./db');

const ProductMaster = function(product){
    this.product_name=product.product_name
};

ProductMaster.create =(newproduct, result)=>{
       
        sql.query("INSERT INTO product_master SET ?", newproduct,(err, res)=>{
            
            if(err){
                console.log("error :",err);
                result(err, null);
                return;
            }  
            
            console.log("created product :",{id:res.insertId, ...newproduct});
            result(null, {id:res.insertId, ...newproduct});
        });
    


}
ProductMaster.getAll = result=>{
    sql.query("SELECT * FROM product_master",(err,res)=>{
        if(err){
            console.log("error :",err);
            result(null,err);
            return;
        }
        console.log("Product master :", res);
        result(null,res);
    })
}


ProductMaster.updatedById = (id,product,result)=> {
    this.updated_on = product.updated_on
    sql.query("UPDATE product_master SET  product_name = ? WHERE product_id = ?", [product.product_name,id],
    (err,res)=>{
            if(err){
                console.log("error :", err);
                result(null,err);
                return;
            }
                if(res.affectedRows != 0){
                    console.log("updated product master : ", {id: id, ...product});
                    result(null, {id: id, ...product});
                    
                }
                else{
                    result({kind: "not_found"}, null);
                    return;
                }
             
            
        
           
        }
    );
};


ProductMaster.removeAll = result =>{
    sql.query("DELETE FROM product_master", (err, results)=>{
        if(err){
            console.log("error :", err);
            result(null,err);
            return;
        }
        console.log("product : ", results);
        result(null, results);
        
    });
};

ProductMaster.findById = (id, result,req)=>{
   
    sql.query('SELECT * FROM product_master WHERE product_id = ?', [id],(err,res)=>{
        if(err){
            console.log("error :", err);
            result(err,null);
            return;
        }else {
            if(res.length){
                console.log("found product : ", res[0]);
                result(null,res[0]);
                return;
            }
        }
            

        result({kind : "not_found"}, null);
    });
};


ProductMaster.remove =(id,result) =>{
    sql.query("DELETE FROM product_master WHERE product_id = ?", [id], (err, res)=>{
        if(err){
            console.log("error :",err);
            result(null, err);
            return;
        }else{
            if(res.affectedRows !=0){
                
                console.log("Deleted product with id:", id);
                result(null,res);
            }
        }

        if(res.affectedRows == 0){
            result({kind : "not_found"}, null);
            return;

        }

        
    });
};

 
module.exports = ProductMaster;

  