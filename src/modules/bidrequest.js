const express = require("express");
const bodyparser = require("body-parser");
const con = require("../db/connect");
const datetime=require("node-datetime");
const cron = require('node-cron');
//below function is a module which is used at index.js this function is async and it handles the process of bidrequest




async function bidrequest(req, res) {
  const currenthour=new Date().getHours();
  if(currenthour<7){
      res.json({alert3:true});
      return;
  }
  else if(currenthour>20){
      res.json({alert4:true});
      return;
  }
  else
  {
      const uid = req.body.uid;
      const bidamount = req.body.bidamount;
      const bookid = req.body.bookid;
      const sql5=`select * from book where userid=${uid}`
      const sql1 = `SELECT proposed_price FROM book WHERE bookid='${bookid}'`;
      const sql2 = `SELECT bidamount  FROM bid WHERE bid.bookid='${bookid}' ORDER BY bidamount DESC`;
      const sql3 = `INSERT INTO bid (uid, bidamount, bookid) VALUES ('${uid}', '${bidamount}', '${bookid}')`;
      const sql4 = `SELECT @row_number := @row_number + 1 AS bidid, bidamount, bookid FROM (SELECT @row_number := 0) AS r, bid WHERE bookid = ${bookid} ORDER BY bidid`;
      let condition=true;
      con.query(sql5,async(error,result)=>{
          try {
              if(error) throw error;
              if(result.length>0){
                  return res.json({alert5:true})
              }
              else if(result.length===0){
                con.query(sql1, async (error, result1) => {
                  try {
                    if (error) throw error;
                    if (result1) {
                      let proposed_price = result1[0].proposed_price;
                      let halfproposedprice = proposed_price * 0.5;
                      con.query(sql2, async (error, result2) => {
                        try {
                          if (error) throw error;
                          if (result2.length == 0) {
                            if (halfproposedprice >= bidamount) {
                              condition = false;
                              res.json({ alert1: true, halfproposedprice });
                              return;
                            }
                            con.query(sql3, async (error, result3) => {
                              try {
                                if (error) throw error;
                                if (result3) {
                                  con.query(sql4, async (error, result4) => {
                                    try {
                                      if (error) throw error;
                                      if (result4.length > 0) {
                                        res.json({ success: true, result4 });
                                        return;
                                      }
                                    } catch (error) {
                                      throw error;
                                    }
                                  });
                                }
                              } catch (error) {
                                throw error;
                              }
                            });
                          } else if (result2.length > 0) {
                            let maxbidamount = result2[0].bidamount;
                            if (halfproposedprice >= bidamount) {
                              condition = false;
                              res.json({ alert1: true, halfproposedprice });
                              return;
                            } else if (maxbidamount >= bidamount) {
                              condition = false;
                              res.json({ alert2: true, maxbidamount });
                              return;
                            }
                            if (condition) {
                              con.query(sql3, async (error, result3) => {
                                try {
                                  if (error) throw error;
                                  if (result3) {
                                    con.query(sql4, async (error, result4) => {
                                      try {
                                        if (error) throw error;
                                        if (result4.length > 0) {
                                          res.json({ success: true, result4 });
                                        }
                                      } catch (error) {
                                        throw error;
                                      }
                                    });
                                  }
                                } catch (error) {
                                  throw error;
                                }
                              });
                            }
                          }
                        } catch (error) {
                          throw error;
                        }
                      });
                    }
                  } catch (error) {
                    throw error;
                  }
                });
              }
          } catch (error) {
              throw error;
          }
      })
      //from start
      
      //till here
  }
}  

module.exports=bidrequest;