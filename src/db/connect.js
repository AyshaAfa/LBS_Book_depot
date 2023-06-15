const mysql = require('mysql');
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootpassword",
  database: "secondhand"
});
const connection=con.connect(function(error){
  if(error) throw error;
  console.log("database connection is successfull");
})
module.exports=con,connection;
