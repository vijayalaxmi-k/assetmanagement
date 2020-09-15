const mysql = require('mysql');

/*const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dev_instadb',
  })

  module.exports=pool;*/
/*import 'dbconnection\.env';



export const HOST = process.env.HOST;
export const USER = "root";
export const PASSWORD = "";
export const DB = "dev_instadb";*/

var http = require("http");

module.exports = {
    HOST : "secure-myadmin-dev-instance.vedya.biz",
    USER : "dev_instadb",
    PASSWORD: "sdhgd9JDB",
    DB :"dev_instadb",
    PORT: 3306
}; 


