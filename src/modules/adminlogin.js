const express=require("express");
const bodyparser=require("body-parser");
const con=require("../db/connect")
const bcrypt=require("bcryptjs");
async function adminlogin(req,res){
    try 
    {
        username=req.body.username;
        password= req.body.password;
        let sql=`select password from admin where username='${username}'`
        con.query(sql,async(error,result,fields)=>{
          try {
            if(error) throw error;
            if(result.length>0){
              const passwordcheck= await bcrypt.compare(password,result[0].password)
              console.log(passwordcheck);
              if(passwordcheck){
                req.session.logged_in=true;
                console.log(passwordcheck);
                res.json({success:true});
              }
            else res.json({success:false})
            }
          } catch (error) {
            console.log(error)
          }
    
        })
    } 
    catch (error) 
    {
      console.log(error);
    }
}
module.exports=adminlogin;