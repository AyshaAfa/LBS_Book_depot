const express=require("express");
const bodyparser=require("body-parser");
const con=require("../db/connect");
async function otpverification(req,res){
    try {
        let number1=req.body.number1;
        let number2=req.body.number2;
        let number3=req.body.number3;
        let number4=req.body.number4;
        let merged=Number(`${number1}${number2}${number3}${number4}`)
        let sql=`select otp from otp where otp=${merged}`;
        con.query(sql,(error,result)=>{
            if(error) throw error;
            if(result.length>0)
            {
                let sql2="delete from otp";
                con.query(sql2,(error,result)=>
                {
                    if(error) throw error;
                    if(result) res.json({success:true});
                })
            }
            else res.json({success:false});
        })
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
}
module.exports=otpverification;