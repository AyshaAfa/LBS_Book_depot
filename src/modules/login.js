const express = require("express");
const bodyparser = require("body-parser");
const con = require("../db/connect");
const bcrypt = require("bcryptjs");
const fast2sms = require("fast-two-sms");
const unirest = require("unirest");

var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

async function otplogin(mobile, message) {
  req.query({
    "authorization": "VLYWguvIrGHQzHwhog7NVOb3cNKkF4kdRwo106dGZ6M0ZMZJyNSqI7CD35DO",
    "message": message,
    "language": "english",
    "route": "q",
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

function otp(limit) {
  let digits = '0123456789'
  let otp = ''
  for (let i = 0; i < limit; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function login(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  const useremail = `SELECT userid,name,userid,password,mobile FROM user WHERE username='${username}'`;
  let sql = `select * from book;`
  con.query(useremail, async (error, result, fields) => {
    try {
      if (error) {
        console.error(error);
        res.status(500).send("Internal server error");
        return;
      } else {
        if (result.length > 0) {
          const passwordcheck = await bcrypt.compare(password, result[0].password);
          const mobile = result[0].mobile;
          const name = result[0].name.toUpperCase();
          const fname = result[0].name;
          const otpgeneration = otp(4);

          const message = `This message is from LbsDepot!!!!!
          Dear ${name}, Bidding time for books is between 7:00 pm to 8:00 pm. If you are interested in bidding, kindly participate in the bidding.`;

          if (passwordcheck === true) {
            req.session.logged_in = true;
            con.query(sql, async (error, result1) => {
              try {
                if (error) throw error;
                if (result1.length > 0) {
                    req.user=result[0].userid

                  return res.json({
                    result: result,
                    success: true
                  });
                } else {
                    console.log("page is here")
                 return  res.json({ alert1: true,result:result });
                }
              } catch (error) {
                throw error;
              }
            });
          } else {
            return res.json({ success: false });
          }
        } else if (result.length == 0) {
          return res.json({ alert: true });
        }
      }
    } catch (error) {
      console.log(error)
    }
  });
}

module.exports = login;

