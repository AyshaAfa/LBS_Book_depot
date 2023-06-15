const con = require("../db/connect");
const cron = require('node-cron');
const unirest = require("unirest");
var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");
require('dotenv').config();
const env=process.env;
async function otplogin(mobile, message) {
  req.query({
    "authorization": "env.OTP_API_KEY",
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
let message=[];
let message1=[];
let bookname=[];
let name=[];
let bidamount=[];
let mobile=[];
let mobile1=[];
let seller=[];
let resultbuyer=[];
let resultseller=[];
async function finalizeonbid() {
    // This function for server will update the bid detail at each day 9pm
    cron.schedule('18 19 * * *', async () => {
      date = new Date();
      console.log(`function has been started at ${date}`);
      let sql = await "call finalizeonbid()"
      let sql2 = "SELECT user.name AS sellername, MAX(user.mobile) AS sellercontact FROM user JOIN bidbook ON bidbook.bookuserid = user.userid GROUP BY user.name";
      con.query(sql, async (error, result) => {
        try {
          if (error) throw error;
          if (result) {
            let resultlength=result.length;
            for(let i=0;i<=result.length;i++)
            {
                name[i]=result[0][i].name;
                bookname[i]=result[0][i].bookname;
                bidamount[i]=result[0][i].bidamount;
                message[i]= `Your book has been ordered by ${result[0][i].name}(+91${result[0][i].mobile}).Total of ₹${result[0][i].bidamount} is your price for your book.Kindly update whether your book is sold within 2 days or not else your book will be removed from the site.`
                mobile[i]=result[0][i].mobile;
              }
            con.query(sql2, async (error, result2) => {
              try {
                if (error) throw error;
                if (result2.length > 0) 
                {
                   for(let i=0;i<result2.length;i++){
                     message1[i]=`Dear ${name[i]},Your bid for ${bookname[i]} has successfully  placed.Total of ₹${bidamount[i]} has to be paid to your seller.Your seller name is ${seller[i]}(+91${mobile1[i]}).please contact your seller`;

                }
                //    for(let i=0;i<=resultlength;i++){
                //     otplogin(mobile[i],message1[i]);
                //     otplogin(mobile1[i],message[i]);
                //    }
                }
              } catch (error) {
                throw error;
              }
            })
  
          }
        } catch (error) {
          throw error;
        }
      })
      
    }, {
      scheduled: true,
      timezone: 'Asia/Kolkata'
    });
  
  } 


module.exports={
    finalizeonbid,
    message,
    message1
}