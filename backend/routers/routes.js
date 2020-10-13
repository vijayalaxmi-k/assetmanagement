var connection = require('../models/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const verifyToken = require('./jwtMiddleware');

module.exports = app => {
  var roles = require('../controllers/roles_master_controller');
  var branch = require('../controllers/branch_management_controller');
  var usergroup = require('../controllers/user_group_controller');
 var user = require('../controllers/user_management_controller');
 var productmaster= require('../controllers/product_master_controller');
 var modulemaster = require('../controllers/module_master_controller');
  var permissions=require("../controllers/permission_type_controller");
var user_map=require('../controllers/user_prod_map_controller')
var router = require('express').Router();
  
   
//product Master
router.post("/productmaster",productmaster.create);
router.get("/productmaster", productmaster.findAll);
router.delete("/productmaster", productmaster.deleteAll);
router.get("/productmaster/:id",productmaster.findOne);
router.delete("/productmaster/:id",productmaster.delete);
router.put("/productmaster/:id",productmaster.update);

//userGroup
router.post("/usergroup",usergroup.create);
router.get("/usergroup", usergroup.findAll);
router.delete("/usergroup", usergroup.deleteAll);
router.get("/usergroup/:id",usergroup.findOne);
router.delete("/usergroup/:id",usergroup.delete);
router.put("/usergroup/:id",usergroup.update);


//role master
router.post("/roles",  roles.create);
router.get("/roles",  roles.findAll);
router.delete("/roles",  roles.deleteAll);
router.get("/roles/:id",  roles.findOne);
router.delete("/roles/:id",  roles.delete);
router.put("/roles/:id",  roles.update);

//branch management
router.post("/branch",branch.create);
router.get("/branch", branch.findAll);
router.delete("/branch", branch.deleteAll);
router.get("/branch/:id",branch.findOne);
router.delete("/branch/:id",branch.delete);
router.put("/branch/:id",branch.update);

  //user management  
  router.post("/user",  user.create);
  router.get("/user",  user.findAll);
  router.delete("/user",  user.deleteAll);
  router.get("/user/:id",  user.findOne);
  router.delete("/user/:id",  user.delete);
  router.put("/user/:id",  user.update);
  router.post("/users/login", user.login);
  router.post("/usermap/add",user_map.createUsermap)


  //Module master

router.post("/modulemaster",modulemaster.create);
router.get("/modulemaster", modulemaster.findAll);
router.delete("/modulemaster", modulemaster.deleteAll);
router.get("/modulemaster/:id",modulemaster.findOne);
router.delete("/modulemaster/:id",modulemaster.delete);
router.put("/modulemaster/:id",modulemaster.update);


//permission type
router.post("/permissiontype",permissions.create);
router.get("/permissiontype", permissions.findAll);
router.delete("/permissiontype", permissions.deleteAll);
router.get("/permissiontype/:id",permissions.findOne);
router.delete("/permissiontype/:id",permissions.delete);
router.put("/permissiontype/:id",permissions.update);

//Roles management
var sql = require('../models/db');
router.get("/rolemanagement",result=>{
    sql.query("SELECT R.role_name,P.permission_type,M.module_name,PM.prod_name from roles_management N, role_master R, permission_type_master P, module_permission M, product_master PM WHERE N.role_id=R.role_id AND N.perm_type_id=P.perm_type_id AND N.mod_per_id = M.mod_per_id AND N.prod_id =PM.prod_id ",(err,res)=>{
      if(err)
        console.log(err)
      else
        console.log(res)
    })
  })

  app.use('/api', router);
}
