
var connection = require('../models/db')

module.exports = app => {
    var user = require('../controllers/user_management_controller');
    var roles=require('../controllers/roles_management_conroller');
    var branch = require('../controllers/branch_management_controller');

    var router = require('express').Router();

    router.post("/user",user.create);
    
    router.get("/user", user.findAll);

    


    router.get('/user/:id',(req,res)=>{
        connection.query('SELECT * FROM user_management where user_id =?',[req.params.id],(err,rows,fields)=>{
            if (!err){
                   var response = [];
                 
                if (rows.length != 0) {
                response.push({'result' : 'success', 'data' : rows});
                } else {
                response.push({'result' : 'error', 'msg' : 'No Results Found'});
                }
                 
                res.setHeader('Content-Type', 'application/json');
                     res.status(200).send(JSON.stringify(response));
                   } else {
                    res.status(400).send(err);
                   }
                });
                
     });


     router.put("/user/:id", (req,res)=>{
        var userId = req.params.id, response=[];
      
           var firstname = req.body.firstname;
            var lastname   =req.body.lastname;
            var email = req.body.email;
            var contact = req.body.contact;
           var password = req.body.password;
           var confirmpwd = req.body.confirmpwd;
            var dept_id=req.body.dept_id;
           var branch_id =req.body.branch_id;
            var active = req.body.active;
            var confirmed = req.body.confirmed;
            //assoc_role:req.body.assoc_role,
            
            var module_id = req.body.module_id;
            var role_perm_id=req.body.role_perm_id;
            
     
        connection.query("UPDATE user_management SET firstname = ?,lastname = ?,email =?,contact=?,password=?,confirmpwd=?,dept_id=?,branch_id=?,active=?,confirmed=?,module_id=?,role_perm_id=? WHERE user_id=?",[firstname,lastname,email,contact,password, confirmpwd,dept_id,branch_id,active,confirmed,module_id,role_perm_id,userId],function(err,result){
            if(!err){
                if(result.affectedRows !=0){
                    response.push({'results':'Suecess'});
                }else{
                    response.push({'msg':'No result found'});
                }
      
                res.setHeader('Content-Type','application/json');
                    res.status(200).send(JSON.stringify(response));
              } else {
                        res.status(400).send(err);
             }
            
        });
     });
     
    
    

    router.delete("/user/:id",(req,res)=>{
        connection.query('DELETE FROM user_management where user_id =?',[req.params.id],(err,rows,fields)=>{
            if(!err)
            res.send('Deleted successfull...');
            else
            console.log(err);
        });
    });
    router.delete("/user", user.deleteAll);

    router.post("/roles",roles.create);
    
    router.get("/roles", roles.findAll);

    


    router.get('/roles/:id',(req,res)=>{
        connection.query('SELECT * FROM roles_management R, module_master M,permission_type_master P where R.perm_type_id=P.perm_type_id AND R.module_id=M.module_id AND R.role_perm_id =?',[req.params.id],(err,rows,fields)=>{
            if (!err){
                   var response = [];
                 
                if (rows.length != 0) {
                response.push({'result' : 'success', 'data' : rows});
                } else {
                response.push({'result' : 'error', 'msg' : 'No Results Found'});
                }
                 
                res.setHeader('Content-Type', 'application/json');
                     res.status(200).send(JSON.stringify(response));
                   } else {
                    res.status(400).send(err);
                   }
                });
                
     });

    router.put("/roles/:id", (req,res)=>{
        var roleId = req.params.id, response=[];
      
        var perm_type_id=req.body.perm_type_id;
        var module_id=req.body.module_id;
       
           
        connection.query("UPDATE roles_management SET perm_type_id = ?,module_id= ? WHERE role_perm_id=?",[perm_type_id,module_id,roleId],function(err,result){
            if(!err){
               if(result.affectedRows !=0){
                   response.push({'results':'Suecess'});
               }else{
                   response.push({'msg':'No result found'});
               }
     
               res.setHeader('Content-Type','application/json');
                   res.status(200).send(JSON.stringify(response));
             } else {
                       res.status(400).send(err);
            }
            
        });
     });
     
    
    

    router.delete("/roles/:id",(req,res)=>{
        connection.query('DELETE FROM roles_management where role_perm_id =?',[req.params.id],(err,rows,fields)=>{
            if(!err)
            res.send('Deleted successfully...');
            else
            console.log(err);
        });
    });
    router.delete("/roles", roles.deleteAll);


    
    router.post("/branch",branch.create);
    
    router.get("/branch", branch.findAll);

    


    router.get('/branch/:id',(req,res)=>{
        connection.query('SELECT * FROM branch_management where dept_branch_id =?',[req.params.id],(err,rows,fields)=>{
            if (!err){
                   var response = [];
                 
                if (rows.length != 0) {
                response.push({'result' : 'success', 'data' : rows});
                } else {
                response.push({'result' : 'error', 'msg' : 'No Results Found'});
                }
                 
                res.setHeader('Content-Type', 'application/json');
                     res.status(200).send(JSON.stringify(response));
                   } else {
                    res.status(400).send(err);
                   }
                });
                
     });


     router.put("/branch/:id", (req,res)=>{
        var branchId = req.params.id, response=[];
      
           var branch_name = req.body.branch_name;
           var dept_display_name=req.body.dept_display_name;
            
            
     
        connection.query("UPDATE branch_management SET branch_name = ?,dept_display_name=? WHERE dept_branch_id=?",[branch_name,dept_display_name,branchId],function(err,result){
            if(!err){
                if (result.affectedRows != 0) {
                    response.push({'result' : 'success'});
                    } else {
                    response.push({'msg' : 'No Result Found'});
                    }
                     
                    res.setHeader('Content-Type', 'application/json');
                         res.status(200).send(JSON.stringify(response));
                       } else {
                        res.status(400).send(err);
                       }
                    
            
        });
     });
     
    
    

    router.delete("/branch/:id",(req,res)=>{
        connection.query('DELETE FROM branch_management where dept_branch_id =?',[req.params.id],(err,rows,fields)=>{
            if(!err)
            res.send('Deleted successfull...');
            else
            console.log(err);
        });
    });
    router.delete("/branch", branch.deleteAll);


      router.post("/login",(req,res)=>{
        var email = req.body.email;
        var password=req.body.password;
        connection.query("select * from user_management",(err,rows)=>{
            if(!err){
                if(rows[0].email == email && rows[0].password==password){
                    res.send("success");
                }else{
                    res.send("error");
                }
            }else
                console.log("error");
         
        });
    })

    router.post('/logins',user.login)  
    
    
    app.use('/api',router);
    

}
