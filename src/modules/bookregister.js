const express=require("express");
const bodyparser=require("body-parser");
const con=require("../db/connect");
async function uppercase(values){
    try {
        let temp;
        temp=values.toUpperCase();
        values=temp;
    } catch (error) {
        console.log(error);
    }
}
async function bookregister (req,res){
        try {
            let bookname=req.body.bookname;
            uppercase(bookname);
            let authorname=req.body.authorname;
            uppercase(authorname);
            let semester=req.body.semester;
            let condition=req.body.condition;
            uppercase(condition)
            let purchase_date=req.body.purchase_date;
            let market_price=req.body.market_price;
            let proposed_price=req.body.proposed_price;
            let description=req.body.description;
            let userid=req.body.userid;
            let uploadid=req.body.uploadid;
            let sql1="insert into book (bookname,authorname,semester,`condition`,purchase_date,market_price,proposed_price,description,userid,uploadid) values('"+bookname+"','"+authorname+"','"+semester+"','"+condition+"','"+purchase_date+"','"+market_price+"','"+proposed_price+"','"+description+"','"+userid+"','"+uploadid+"')";
            let sql=`select * from book`
            con.query(sql1,async(error,result)=>{
                    if(error) throw error;
                    if(result)
                    {
                        return res.json({success:true});
                    }
                    else return res.json({success:false});
            })
        } catch (error) {
            throw error;
            
        }
}


module.exports=bookregister;