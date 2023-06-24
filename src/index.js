//main requirement is specified here
const port = 8000;
const login=require("../src/modules/login");
const register=require("../src/modules/register")
const bookregister=require("../src/modules/bookregister");
const verify=require("../src/modules/verificationreq");
const verification=require("../src/modules/verification");
const reset=require("../src/modules/passwordreset");
const adminlogin=require("../src/modules/adminlogin");
const bookdetail=require("../src/modules/bookdetail");
const bidrequest=require("../src/modules/bidrequest");
const express = require("express");
const session=require("express-session");
const app = express();


app.use(session({
  secret: 'H8VpEypeDG',
  resave: false,
  saveUninitialized: true
}));


const con=require("./db/connect")
//const express = require("express");
//const app = express();
const path = require("path");
const hbs=require("hbs");
const { error } = require("console");
const schedule=require("../src/modules/schedule");
const datetime=require("node-datetime");
const dt=datetime.create();
const day=dt.format('d-m-y');
const time=dt.format('I:M:S');
const currenttime=new Date().getHours()
const bcrypt=require("bcryptjs"); //this module used for hashing the password
const multer=require("multer"); //image uploading
const otpverification = require("../src/modules/verification");
const passwordreset = require("../src/modules/passwordreset");
require("dotenv").config();
const env=process.env;
const confirmation=require("../src/modules/confirmation");
const mybook=require("../src/modules/mybook")
let userid=0;

// app.use(session({
//   secret: "H8VpEypeDG",
//   resave: false,
//   saveUninitialized: true
// }));


const createpasswordhash=async(password)=>{
  const passwordhash=await bcrypt.hash(password,10);
  return passwordhash;
}//this functions create hashing password 






app.use(express.json());

const staticPath = path.join(__dirname, "../public");
const templatepath=path.join(__dirname,"../template/views");
const partials=path.join(__dirname,"../template/partials");
const imageupload=path.join(__dirname,"/upload")
app.use("/upload",express.static(imageupload))
app.use(express.static(staticPath));
app.set("view engine","hbs");
app.set("views",templatepath);
hbs.registerPartials(partials);

//setup for image storing from here 
let storage=multer.diskStorage({
  destination: function(req,file,cb){
    return cb(null,__dirname+"/upload")
  },
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
  }
})
let upload=multer({
  storage:storage
})








// checking login page 
const checkLoggedIn = (req, res, next) => {
  if (req.session.logged_in) {
    next();
  } else {
    res.redirect("/");
  }
}
//checking logout page 
async function logout(){
  const loggedout=(req,res,next)=>{
    if(!req.session.logged_in){
        env.userid=0;
        res.direct("/")
    }
    else
    {
        next();
    }
  }
}
//login page
app.get("/", (req, res) => {
  res.render("login");
});
app.post("/",  (req, res) => {
  const fast2sms = require("fast-two-sms");
  let username = req.body.username;
  let password = req.body.password;
  const useremail = `SELECT userid,name,password,mobile FROM user WHERE username='${username}'`;
  let sql = `select * from book;`
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
          let userid=result[0].userid;
          app.set("uid",userid)
          const message = `This message is from LbsDepot!!!!!
          Dear ${name}, Bidding time for books is between 7:00 pm to 8:00 pm. If you are interested in bidding, kindly participate in the bidding.`;

          if (passwordcheck === true) {
            // req.session.logged_in = true;
            con.query(sql, async (error, result1) => {
              try {
                if (error) throw error;
                if (result1.length > 0) {
                  return res.json({success:true ,result:result})
                } else {
                  app.set("uid",userid)
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
});

//backup for login page this page for if page doesnot have book
app.get("/bhome",async(req,res)=>{
  res.render("homepage");
})

//resetpassword
app.get("/resetpassword",(req,res)=>{
  res.render("passwordreset")
})
app.post("/resetpassword",(req,res)=>{
  passwordreset(req,res);
})


//register page
app.get("/register", (req, res) => {
    res.render("register");
  });

app.post("/register", async(req, res) => {
  register(req,res);
});

//book register

app.get("/home/bookregister",function(req, res)  {
  //if(!checkLoggedIn) res.redirect("login")
    res.render("bookregister");
  });
  
app.post("/home/bookregister",(req,res)=>{
  bookregister(req,res);
})

app.post("/home/bookregisterpicture",upload.single("imagefile"),(req,res)=>{
  let image=req.file.filename;
  let userid=req.body.userid;
  let sql=`insert into uploadimage(upload,userid) values('${image}','${userid}')`;
  con.query(sql,function (error,result){
    if(error) throw error;
    if(result) 
    {
      let sql1=`select uploadid from uploadimage where userid='${userid}'`;
      con.query(sql1,async (error,result)=>{
          try {
            if(error) throw error;
            if(result.length>0)
            {
              console.log(result);
              res.json({result:result,
              success1:true});
            }
            else
              res.json({sucess1:false})
          } catch (error) {
            console.log(error);
          }
      })
    }
  })
})


//otp generator 
app.get("/verify",(req,res)=>{
  res.render("verification");
});

app.post("/verify",(req,res)=>{
  verify(req,res);
})


//verification
app.get("/otpverification",(req,res)=>{
  res.render("otpverification")
})

app.post("/otpverification",(req,res)=>{
  otpverification(req,res);
})


//viewbook

app.get("/home",(req,res)=>{ 
      let userid1=req.query.uid; 
     // req.app.set("uid",userid1)         
      let sql="SELECT book.bookid, book.bookname, uploadimage.upload FROM book INNER JOIN uploadimage ON book.uploadid = uploadimage.uploadid"
      con.query(sql,function(error,result,fields)
      {
          if(error) throw error;
          if(result.length>0)
          {
            res.render("viewbook",{
              result
            })
        }
    
      })

})

//confirmation 
app.get("/home/confirmation",(req,res)=>{
 const userid1=app.get("uid")
  console.log(userid1);
 const userid=env.userid;
  confirmation(userid1,res);
})



app.get("/home/order",async(req,res)=>{
  try {
    res.render("orderBook");
  } catch (error) {
    console.log(error);
  }
})



//logout
app.get("/logout",checkLoggedIn,(req,res)=>{
  req.session.logged_in=false
  logout();
})





//viewuser
app.get("/viewuser",checkLoggedIn,(req,res)=>{
  res.render("viewuser",{

  });
})

app.post("/viewuser",(req,res)=>{
  let sql="select * from user";
  con.query(sql,(error,result,fields)=>{
    if(error) throw error;
    console.log(result);
    res.send(JSON.stringify(result));
  })

})

//bookdetail
app.get("/home/bookdetail",async(req,res)=>{
  try {
   bookdetail(req,res);
  } catch (error) {
    console.log(error);
  }
})
app.post("/home/bookdetail",async(req,res)=>{
  try {
    bidrequest(req,res);
  } catch (error) {
    console.log(error);
  }
})


//mybook
app.get("/home/mybooks",async(req,res)=>{
    try {
      let userid=app.get("uid")
      mybook(req,res,userid);
    } catch (error) {
      throw error;
    }
})



//admin section
app.get("/adminlogin",async(req,res)=>{
  try {
    res.render("adminlogin");
  } catch (error) {
    res.status(400);
  }

})//password is Lbscek123
app.post("/adminlogin",async(req,res)=>{
  adminlogin(req,res);
})

app.listen(port, () => {
  console.log(`listening to ${port}`);
  //schedule.finalizeonbid();
});
