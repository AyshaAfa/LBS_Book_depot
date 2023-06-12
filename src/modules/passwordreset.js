const express=require("express");
const bodyparser=require("body-parser");
const con=require("../db/connect");
const bcrypt=require("bcryptjs");
const createpasswordhash=async(password)=>{
    const passwordhash=await bcrypt.hash(password,10);
    return passwordhash;
  }//this functions create hashing password 
async function passwordreset(req,res){
    try {
        let password= await createpasswordhash(req.body.password);
        let userid= await req.body.userid;
        console.log(req.body);
        let sql=`update user set password='${password}' where userid='${userid}'`;
        con.query(sql,async(error,result)=>{
            try {
                if(error) throw(error);
                if(result)
                {
                    res.json({success:true});
                }
                else 
                {
                    con.
                    res.json({success:false});
                }    
            } catch (error) {
                console.log(error);

            }
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports=passwordreset,createpasswordhash;