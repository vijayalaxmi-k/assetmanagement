const sql = require("../models/db");

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken')

const UserManagement = function (user) {
    this.first_name = user.first_name
    this.last_name = user.last_name
    this.email = user.email
    this.contact = user.contact
    this.password = user.password
    //this.status=user.status
    this.active = user.active
//     this.created_on=user.created_on
//     this.updated_on=user.updated_on
//    // this.confirmpwd = user.confirmpwd
    // this.active = user.active
    // this.user_group_id=user.user_group_id
    // this.prod_id = user.prod_id
    // this.prod_branch_id = user.prod_branch_id 
    // this.role_perm_id = user.role_perm_id
    // this.module_name = user.module_name
    //this.dept_branch_id =user.dept_branch_id
    // this.assoc_role=user.assoc_role
    //this.mod_per_id = user.mod_per_id
    //this.dept_id = user.dept_id
    // this.branch_id = user.branch_id
};

UserManagement.create = async (newUser, result) => {


    sql.query("INSERT INTO user_management SET ?", newUser, (err, res) => {

        if (err) {
            console.log("error :", err);
            result(err, null);
            return;
        }
       // console.log(newUser);
        console.log("created User:", {
            id: res.insertId,
            ...newUser
        });
        result(null, {
            id: res.insertId,
            ...newUser
        });
    });

}


UserManagement.getAll = result => {
//select u.first_name,u.last_name,u.email,u.confirmed, r.role_name,u.module_name from user_management u inner join role_master r on u.role_perm_id = r.role_id
    sql.query("select * from user_management", (err, res) => {
        if (err) {
            console.log("error :", err);
            result(null, err);
            return;
        }
        console.log("users: ", res);
        result(null, res);
    });
};


UserManagement.updatedById = (id, user, result) => {
    sql.query("UPDATE user_management SET  first_name = ?,last_name = ?,email =?,contact=?,password=?,status=?,confirmed=?,updated_on=? WHERE user_id = ?", [user.first_name, user.last_name, user.email, user.contact, user.password,user.status,user.confirmed,user.updated_on, id],
        (err, res) => {
            if (err) {
                console.log("error :", err);
                result(null, err);
                return;
            }
            if (res.affectedRows != 0) {
                console.log("updated user : ", {
                    id: id,
                    ...user
                });
                result(null, {
                    id: id,
                    ...user
                });

            } else {
                result({
                    kind: "not_found"
                }, null);
                return;
            }





        }
    );
};


UserManagement.removeAll = result => {
    sql.query("DELETE FROM user_management", (err, results) => {
        if (err) {
            console.log("error :", err);
            result(null, err);
            return;
        }
        console.log("users: ", results);
        result(null, results);

    });
};

UserManagement.findById = (id, result, req) => {

    sql.query('SELECT * FROM user_management WHERE user_id = ?', [id], (err, res) => {
        if (err) {
            console.log("error :", err);
            result(err, null);
            return;
        } else {
            if (res.length) {
                console.log("found user : ", res[0]);
                result(null, res[0]);
                return;
            }
        }


        result({
            kind: "not_found"
        }, null);
    });
};


UserManagement.remove = (id, result) => {
    sql.query("DELETE FROM user_management WHERE user_id = ?", [id], (err, res) => {
        if (err) {
            console.log("error :", err);
            result(null, err);
            return;
        } else {
            if (res.affectedRows != 0) {

                console.log("Deleted user with id:", id);
                result(null, res);
            }
        }

        if (res.affectedRows == 0) {
            result({
                kind: "not_found"
            }, null);
            return;

        }


    });
};



UserManagement.login = async (email, password, result) => {
    // console.log(email)

    sql.query("select * from user_management where email=?", [email], async (err, rows, fields) => {
       // console.log(password)
       //  console.log(rows[0]['password']);
        //console.log(rows[0]['email']);
        //console.log(email)
        if (rows.length != 0) {

            const comparision = await bcrypt.compare(password, rows[0]['password'])
              //console.log(await bcrypt.compare(password, rows[0]['password']))
               // console.log(comparision)
            if (comparision) {
                //console.log(await bcrypt.compare(password, rows[0]['password']))
                //    console.log(rows[0]['password']);

                const token = jwt.sign({
                    id: rows[0]['user_id'],
                    email: rows[0]['email'],

                }, 'vedyaSecrets', {
                    expiresIn: 86400
                });
                console.log(authentication = true)

                console.log("login success");

                result({
                    kind: "success",
                    token: token
                }, null);

                return;

            } else {
                result({
                    kind: "invalid"
                }, null);
                console.log("invalid password or email")
                console.log(authentication = false)
                return;
            }



        } else {
            console.log("User Not Found")
            result({
                kind: "not_found"
            }, null);
            return;
        }
    });
}
module.exports = UserManagement;
