const url          = 'mongodb://localhost:27017/cmstodo';
const MongoClient  = require('mongodb').MongoClient()
const JSON         = require('circular-json')

module.exports = (app) => {
  app.get("/api/product",function(req,res){
    MongoClient.connect(url, function(err, db) {
      if (err) {
        return res.status(400).send({
          error_msg: "Invalid Data"
        });
      }
      db.collection("products").find({}).toArray(function(err, data) {
        if (err) {
          return res.status(400).send({
            error_msg: "Please try again!!"
          });
        } 
        res.send(JSON.stringify(data));
        // closeing the connection
        db.close();
      });
    })
  });
  app.post("/api/product",function(req,res){
    // Validation 
    if(!req.query) {
      return res.status(400).send({
          error_msg: "Invalid Data"
      });
    }
    //create product
    const product = {
      sku           : req.query.sku,
      price         : req.query.price,
      isavailable   : req.query.isavailable,
      prod_cat      : req.query.prod_cat,
      varient       : req.query.varient,
      img_path      : "Temp"
    }
    //saving product in database
    MongoClient.connect(url, function(err, db) {
      if (err) {
        return res.status(400).send({
          error_msg: "Invalid Data!!"
        });
      }
      db.collection("products").insertOne(product, function(err, data) {
        if (err) {
          return res.status(400).send({
            error_msg: "Invalid Data!!"
          });
        }
        res.send(JSON.stringify(data));
        // closeing the connection
        db.close();
      });
    })
  });
  app.delete("/api/product",function(req,res){
    MongoClient.connect(url, function(err, db) {
      if (err) {
        return res.status(400).send({
          error_msg: "Invalid Data!!"
        });
      }
      db.collection("products").deleteOne({sku:req.query.sku}, function(err, data) {
        if (err) {
          return res.status(400).send({
            error_msg: "Invalid Data!!"
          });
        }
        res.send(JSON.stringify(data));
        // closeing the connection
        db.close();
      });
    })
  });
  app.put("/api/product",function(req,res){
    // Validation 
    if(!req.query) {
      return res.status(400).send({
          error_msg: "Invalid Data"
      });
    }
    //create product
    const product = {
      sku           : req.query.sku,
      price         : req.query.price,
      isavailable   : req.query.isavailable,
      prod_cat      : req.query.prod_cat,
      varient       : req.query.varient,
      img_path      : "Temp"
    }
    //saving product in database
    MongoClient.connect(url, function(err, db) {
      if (err) {
        return res.status(400).send({
          error_msg: "Invalid Data!!"
        });
      }
      db.collection("products").updateOne({sku:product.sku},product, function(err, data) {
        if (err) {
          return res.status(400).send({
            error_msg: "Invalid Data!!"
          });
        }
        res.send(JSON.stringify(data));
        // closeing the connection
        db.close();
      });
    })
  });
}