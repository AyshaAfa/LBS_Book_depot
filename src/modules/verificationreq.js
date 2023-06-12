const express=require("express");
const bodyparser=require("body-parser");
const con=require("../db/connect");

const unirest=require("unirest");
var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");
function otp(limit)
{
   let digits='0123456789'
   let otp=''
   for(let i=0;i<limit;i++){
    otp+=digits[Math.floor(Math.random()*10)];
   }
   return otp;
}


async function otplogin(mobile,otp){
    req.query({
        "authorization": "VLYWguvIrGHQzHwhog7NVOb3cNKkF4kdRwo106dGZ6M0ZMZJyNSqI7CD35DO",
        "variables_values": otp,
        "route": "otp",
        "numbers": mobile
      });
      
      req.headers({
        "cache-control": "no-cache"
      });
      
      
      req.end(function (res) {
        if (res.error) throw new Error(res.error);
      
        console.log(res.body);
      });
}
async function verify(req,res){
    try {
        let phonenumber=req.body.phonenumber; 
        let Otp2=otp(4);
        otplogin(mobile,otpgeneration);
        let sql=`select userid from user where mobile='${phonenumber}'`;
        let sql1="insert into otp(otp) values('"+Otp2+"')";
        con.query(sql,function(error,result)
        {
          if(error) throw error;
          if(result.length>0)
          {
           con.query(sql1,async(error,result1)=>{
              try 
              {
                if(error) throw error;
                if(result1)
                {
                    res.json({result:result,
                    success:true
                    })
                }
              } catch (error) {
                console.log(error);
              }
           })
          }
          else res.json({success:false});
        })
        console.log(Otp2);
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
}
module.exports=verify,otplogin,otp;