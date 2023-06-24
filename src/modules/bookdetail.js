const express=require("express");
const bodyparser=require("body-parser");
const con=require("../db/connect");
async function bookdetail(req,res){
    try {
        let bookid=await req.query.bid;
       
        let sql=await `select bookname,authorname,book.semester,book.condition,proposed_price,market_price,uploadimage.upload,user.name,user.semester,user.department FROM book INNER JOIN uploadimage ON book.uploadid=uploadimage.uploadid INNER JOIN user ON book.userid=user.userid where bookid='${bookid}';`;
        let sql1=await `select bidid,bidamount from bid where bookid='${bookid}' and bidamount=(select max(bidamount) from bid where bookid=${bookid})`;
        con.query(sql,async(error,result)=>{
            try {
                if(result.length>0){
                    const result1=result
                    //console.log(result1[0]);
                    con.query(sql1,async(error,result)=>{
                        try {
                            if(error) throw error;
                            let resultbid
                            let resultamount;
                            console.log(result);
                            result1[0].resultbid=result[0].bidid;
                            result1[0].resultamount=result[0].bidamount;
                            console.log(result1)
                            res.render("bookdetail",{
                                result1
                              });
                        } catch (error) {
                            console.log(error);
                        }
                    })
                }
                else
                {
                   res.send(error)
                }
            } catch (error) {
                console.log(error)
            }
          

        })
    } catch (error) {
        throw(error)
    }
}

module.exports=bookdetail;