const express=require("express");
const bodyparser=require("body-parser");
const con=require("../db/connect");
async function bookregister (req,res){
    try 
    {
        let bookname=req.body.bookname;
        let authorname=req.body.authorname;
        let semester=req.body.semester;
        let condition=req.body.condition;
        let purchase_date=req.body.purchase_date;
        let market_price=req.body.market_price;
        let proposed_price=req.body.proposed_price;
        let description=req.body.description;
        let userid=req.body.userid;
        let uploadid=req.body.uploadid;
        let sql="insert into book (bookname,authorname,semester,`condition`,purchase_date,market_price,proposed_price,description,userid,uploadid) values('"+bookname+"','"+authorname+"','"+semester+"','"+condition+"','"+purchase_date+"','"+market_price+"','"+proposed_price+"','"+description+"','"+userid+"','"+uploadid+"')";
        con.query(sql,function (error,result){
        if(error) throw error;
        if(result)
        {
            res.json({success:true});
        }
        else res.json({success:false});
})
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
}
module.exports=bookregister;