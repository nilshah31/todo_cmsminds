const express        = require('express')
const app            =  express()
const router         = express.Router();
const bodyParser     = require('body-parser')
const authRoutes     = require('./rest-api/controller/auth')(app)
const productRoutes  = require('./rest-api/controller/product')(app)
var path    = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/ui/static/css'));
//Store all HTML files in view folder.
// app.use(express.static(__dirname + '/Script'));
// //Store all JS and CSS in Scripts folder.

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+"/ui/login.html"));
})

app.listen(3000,()=>{
  console.log("server started on 3000")
})
app.use("/",router)


