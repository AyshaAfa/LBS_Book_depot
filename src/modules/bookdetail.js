const express=require("express");
const bodyparser=require("body-parser");
const con=require("../db/connect");

async function bookdetail(req,res){
    try {
        let bookid=await req.query.bid;
        let sql= `select bookname,authorname,book.semester,book.condition,proposed_price,market_price,uploadimage.upload,user.name,user.semester,user.department FROM book INNER JOIN uploadimage ON book.uploadid=uploadimage.uploadid INNER JOIN user ON book.userid=user.userid where bookid='${bookid}';`;
        let sql1= `select bidid,bidamount from bid where bookid='${bookid}' and bidamount=(select max(bidamount) from bid where bookid=${bookid})`;
        con.query(sql,async(error,result)=>{
            try {
                if(result.length>0){
                    const result1=result
                    con.query(sql1,async(error,result)=>{
                        try {
                            if(error) throw error;
                            if(result.length>0){
                                let resultbid
                                let resultamount;      
                                result1[0].resultbid=result[0].bidid;
                                result1[0].resultamount=result[0].bidamount;
                               return res.render("bookdetail",{
                                    result1
                                  });
                               // res.json({result:result1[0].bidamount})
                            }
                            if(result.length===0){

                              return  res.render("bookdetail",{
                                    result1
                                  });
                            }
                            let resultbid
                            let resultamount;
                            console.log(result);
                            result1[0].resultbid=result[0].bidid;
                            result1[0].resultamount=result[0].bidamount;
                            console.log(result1)
                             return res.render("bookdetail",{
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


async function myBookdetail(req,res){
    try {
        let current
        let bookid=await req.query.bid;
        let sql= `select bookname,authorname,book.semester,book.condition,proposed_price,market_price,uploadimage.upload,user.name,user.semester,user.department FROM book INNER JOIN uploadimage ON book.uploadid=uploadimage.uploadid INNER JOIN user ON book.userid=user.userid where bookid='${bookid}';`;
        let sql1= `select bidid,bidamount from bid where bookid='${bookid}' and bidamount=(select max(bidamount) from bid where bookid=${bookid})`;
        con.query(sql,async(error,result)=>{
            if(error) throw error;
            if(result.length>0){
                return res.render("buttonBookdetail",{result})
            }
        })
    } catch (error) {
        throw error;
    }
}

module.exports={bookdetail,
    myBookdetail};