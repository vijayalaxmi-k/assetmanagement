//const md5 = require('md5');
//const bcrypt = require('bcrypt');
const sql = require("../models/db");

const bcrypt = require('bcrypt');


const User = require("../models/user_management_model");


exports.create = async (req, res) => {
    const saltRounds = 8;
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    var dateTime = require('node-datetime')
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d');
    console.log(formatted);   
    const password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, saltRounds)
   // console.log(encryptedPassword)
    //console.log(bcrypt.hash(password, 10));
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        contact: req.body.contact,
        password: encryptedPassword,
     //   status:req.body.status,
        active : req.body.active,
       // created_on:formatted,
       // updated_on:formatted

        // confirmpwd: req.body.confirmpwd,
        // active: req.body.active,
        // confirmed: req.body.confirmed,
        // user_group_id:req.body.user_group_id,
        // prod_id: req.body.prod_id,
        // prod_branch_id: req.body.prod_branch_id,
        // role_perm_id: req.body.role_perm_id,
        // module_name: req.body.module_name,
        //  usergroup :  req.body.usergroup,
        //dept_id : req.body.dept_id,
        //assoc_role:req.body.assoc_role,
        // mod_per_id: req.body.mod_per_id,
    });
    // console.log(encryptedPassword)
   

    sql.query('select * from user_management where email= "' + req.body.email + '" ', function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            res.send("user already registered");
            console.log("user alreday registerd")
        } else {
            User.create(user, (err, data) => {


                if (err)
                    res.status(500).send({
                        message: err.message || "some error occured while creating the usre."
                    });

                else {
                    res.send(data);
                    console.log("Insert success")
                }


            });
        }
    });


};

 
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "some error occured while retrieving the user "
            });
        else res.send(data);
    });
};

//find single record 
exports.findOne = (req, res) => {
    User.findById(req.params.id, (err, data) => { //used in user_management_model findbyid 
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: 'Not found user with id.' + req.params.id
                });

            } else {
                res.status(500).send({
                    message: "error retriveing user with id " + req.params.id
                });
            }

        } else

            res.send(data);

    });
};

//update a record

exports.update = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty !"
        });

    }
    const saltRounds = 8;
    const password = req.body.password;
   // console.log(password)
    const encryptedPassword = await bcrypt.hash(password, saltRounds)
   // console.log(encryptedPassword)
   var dateTime = require('node-datetime')
   var dt = dateTime.create();
   var formatted = dt.format('Y-m-d');
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        contact: req.body.contact,
        password: encryptedPassword,
        status:req.body.status,
        confirmed : req.body.confirmed,
      //  created_on:formatted,
        updated_on:formatted
        //assoc_role:req.body.assoc_role,
        //  usergroup :  req.body.usergroup,
        //dept_branch_id : req.body.dept_branch_id,
        //dept_id : req.body.dept_id,
    });


    User.updatedById(req.params.id, user, (err, data) => { //used in user_management_model updatedById 
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: 'Not found user with id.' + req.params.id
                });

            } else {
                res.status(500).send({
                    message: "error retriveing user with id " + req.params.id
                });
            }

        } else

            res.send(data);

    });
};

//delete a single record

exports.delete = (req, res) => {
    User.remove(req.params.id, (err, data) => { //used in user_management_model remove 

        if (err) {
            if (err.kind === "not_found") {
                res.status(400).send({
                    message: 'Not  found user with id .' + req.params.id
                });
            } else {
                res.status(500).send({
                    message: "could not delete user with id " + req.params.id
                });
            }
        } else res.send({
            message: 'user was deleted Successfully ! '
        });
    });
};

exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || " Some error occured while removing all user."
            });
        else res.send({
            message: 'All user were deleted successfully !'
        });
    });
};



exports.login = async function (req, res) {

    var email = req.body.email;
    var password = req.body.password;


    //console.log(email)
    User.login(email, password, (err) => {
        if (err.kind === "success") {
            res.setHeader("x-access-token", err.token)
            res.status(400).json({
                message: 'login success',
                authentication: true,
                token: err.token
            });

        }

        if (err.kind === "invalid") {
            res.status(400).json({
                message: 'Invalid Password',
                authentication: false
            });
        } else {
            if (err.kind === "not_found") {
                res.status(500).json({
                    result: 'error',
                    msg: 'User Not Found'
                });
            }

        }

    });
}