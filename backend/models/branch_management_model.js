var sql = require('./db');

const BranchMaster = function (branch) {
    this.branch_name = branch.branch_name  
};

BranchMaster.create = function (newbranch, results){
    sql.query("SELECT * FROM branch_master where branch_name = '"+newbranch.branch_name+"'",function(err,result){
        if(err) throw err;
        
        if(result.length > 0){
          //  res.send("Branch name is already exist");
            console.log("Branch name is aleredy exist")
        }else{
            sql.query("INSERT INTO branch_master SET ?", newbranch, (err, res) => {
                if (err) {
                    console.log("error :", err);
                    results(err, null);
                    return;
                }
                console.log("created branch :", {
                    id: res.insertId,
                    ...newbranch
                });
                results(null, {
                    id: res.insertId,
                    ...newbranch
                });
            });
        }
    })
}

BranchMaster.getAll = async function(result) {
   await sql.query("SELECT * FROM branch_master", (err, res) => {
        if (err) {
            console.log("error :", err);
            result(null, err);
            return;
        }
        console.log("branch group :", res);
        result(null, res);
    })
}

BranchMaster.updatedById = function(id, branch, result){
  
    sql.query("UPDATE branch_master SET branch_name = ? WHERE branch_id = ?", [branch.branch_name,id],
        (err, res) => {
            if (err) {
                console.log("error :", err);
                result(null, err);
                return;
            }
            if (res.affectedRows != 0) {
                console.log("updated branch : ", {
                    id: id, ...branch
                });
                result(null, {
                    id: id, ...branch
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


BranchMaster.removeAll = result => {
    sql.query("DELETE FROM branch_master", (err, results) => {
        if (err) {
            console.log("error :", err);
            result(null, err);
            return;
        }
        console.log("branch : ", results);
        result(null, results);

    });
};

BranchMaster.findById = function (id, result, req) {

    sql.query('SELECT * FROM branch_master WHERE branch_id = ?', [id], (err, res) => {
        if (err) {
            console.log("error :", err);
            result(err, null);
            return;
        } else {
            if (res.length) {
                console.log("found branch : ", res[0]);
                result(null, res[0]);
                return;
            }
        }


        result({
            kind: "not_found"
        }, null);
    });
};


BranchMaster.remove = function (id, result){
    sql.query("DELETE FROM branch_master WHERE branch_id = ?", [id], (err, res) => {
        if (err) {
            console.log("error :", err);
            result(null, err);
            return;
        } else {
            if (res.affectedRows != 0) {

                console.log("Deleted branch with id:", id);
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


module.exports = BranchMaster;