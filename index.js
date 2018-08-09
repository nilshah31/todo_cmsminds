const express        = require('express')
const app            =  express()
const router         = express.Router();
const bodyParser     = require('body-parser')
const authRoutes     = require('./rest-api/controller/auth')(app)
const productRoutes  = require('./rest-api/controller/product')(app)
var path             = require("path");

app.use(express.static(path.join(__dirname, '/')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+"/ui/index.html"));
})

router.get('/login',function(req,res){
  res.sendFile(path.join(__dirname+"/ui/user_auth/login.html"));
})

router.get('/userdashboard',function(req,res){
  res.sendFile(path.join(__dirname+"/ui/dashboard/partials/dashboard.html"));
})

app.use("/",router)

app.listen(3000,()=>{
  console.log("server started on 3000")
})


