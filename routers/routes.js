module.exports = app => {
    var user = require('../controllers/user_management_controller');
  

    var router = require('express').Router();

    router.post("/",user.create);
    
    router.get("/", user.findAll);

    router.get("/:id", user.findOne);

    router.put("/:id", user.update);
    

    router.delete("/:id",user.delete);

    router.delete("/", user.deleteAll);
    app.use('/api/user',router);

}