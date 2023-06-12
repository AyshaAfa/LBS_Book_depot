const express=require("express");
const bodyparser=require("body-parser");
const con=require("../db/connect");
async function bookdetail(req,res){
    try {
        let bookid=await req.query.bid;
       
        let sql=await `select bookname,authorname,book.semester,book.condition,proposed_price,market_price,uploadimage.upload,user.name,user.semester,user.department FROM book INNER JOIN uploadimage ON book.uploadid=uploadimage.uploadid INNER JOIN user ON book.userid=user.userid where bookid='${bookid}';`;
        let sql1=await `select bidid,bidamount from bid where bookid='${bookid}'`;
        con.query(sql,async(error,result)=>{
            try {
                if(result.length>0){
                    const result1=result
                    con.query(sql1,async(error,result)=>{
                        try {
                            if(error) throw error;
                            let resultbid=[]
                            let resultamount=[]
                            for(let i=0;i<result.length;i++){
                                resultbid[i]=result[i].bidid;
                                resultamount[i]=result[i].bidamount;
                            }
                            result1.resultbid=resultbid;
                            result1.resultamount=resultamount;
                            let merge={
                                ...result1[0],
                                'bidid':result1.resultbid,
                                'bidamount':result1.resultamount
                            }
                            console.log(merge);
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