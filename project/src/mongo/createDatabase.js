var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo:27017/loteria";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});