module.exports = (app) => {
  app.post("/api/auth/login",function(req,res){
    if(req.query.uname==='admin' && req.query.password==='admin'){
      res.json({message:"Welcome User"});
    }
    else{
      return res.status(400).send({
        error_msg: "Auth Failed!!"
      });
    }
  })
  app.post("/api/auth/register",function(req,res){
    res.json({message:"register successfully"});
  })
}