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
      db.collection("products").find({}, function(err, data) {
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
  })
  app.post("/api/product",function(req,res){
    // Validation 
    if(!req.body.content) {
      return res.status(400).send({
          error_msg: "Invalid Data"
      });
    }
    //create product
    const product = new Product({
      sku           : req.params.sku,
      price         : req.params.price,
      isavailable   : req.params.isavailable,
      prod_cat      : req.params.prod_cat,
      varient       : req.params.varient,
      img_path      : "Temp"
    })
    //saving product in database
    MongoClient.connect(url, function(err, db) {
      if (err) {
        return res.status(400).send({
          error_msg: "Invalid Data!!"
        });
      }
      db.collection("products").insertOne(product, function(err, res) {
        if (err) {
          return res.status(400).send({
            error_msg: "Invalid Data!!"
          });
        }
        res.send(res);
        // closeing the connection
        db.close();
      });
    })
  });
}