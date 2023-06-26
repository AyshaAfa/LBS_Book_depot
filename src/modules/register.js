const express=require("express");
const bodyparser=require("body-parser");
const con=require("../db/connect")
const bcrypt=require("bcryptjs");
const createpasswordhash=async(password)=>{
  const passwordhash=await bcrypt.hash(password,10);
  return passwordhash;
}//this functions create hashing password 
async function register(req,res){
    try 
    {
      let name=req.body.name;
      let department=req.body.department;
      let semester=req.body.semester;
      let mobile=req.body.mobile;
      let email = req.body.email;
      let username=req.body.username
      let password =  await createpasswordhash(req.body.password);
      //let sql1 = "INSERT INTO user (name, department, semester,mobile, email, username, password) SELECT '" + name + "',  '" + department + "', '" + semester + "','"+mobile+"', '" + email + "', '" + username + "', '" + password + "' WHERE NOT EXISTS (SELECT name, department, semester,mobile, email, username, password FROM user WHERE name='" + name + "'  AND department='" + department + "' AND semester='" + semester + "' AND mobile='"+mobile+"' AND email='" + email + "' AND username='" + username + "' AND password='" + password + "')";
      let sql2=`insert into user (name,department,semester,mobile,email,username,password) values('${name}','${department}','${semester}','${mobile}','${email}','${username}','${password}')`;
      //let sql1=`select * from user where email='${email}'`
      console.log(password);
      let sql1=`select * from user where username='${username}'`;
      let sql=`select userid from user where mobile='${mobile}'or email='${email}'`;
      con.query(sql1,function(error,result,fields)
      {
          if(error) throw error;
          if(result.length>0)
          {
                return  res.json({alert:false});

          }
          else if(result.length==0)
          {
                con.query(sql,async(error,result)=>
                {
                  try 
                  {
                    if(error) throw error;
                    if(result.length>0) return res.json({success:false})
                    else if(result.length===0)
                    {
                        con.query(sql2,async(error,result)=>{
                          try {
                            if(error) throw error;
                            if(result)  return res.json({success:true})
                          } catch (error) {
                            throw error;
                          }
                        })
                    }
                  } 
                  catch (error) 
                  {
                    console.log(error);
                  }
                })
          }
      })
    }
    catch (error) 
    {
      console.log(error);
    }
}
module.exports=register,createpasswordhash;
