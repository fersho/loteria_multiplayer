var MongoClient = require('mongodb').MongoClient;
class MongoManager {
  // We use destructuring to match properties on the object
  // passed into separate variables for character and actor
  constructor() {
    this.db = "loteria";
    this.url = "mongodb://mongo:27017/";   
  }
  // shorthand method syntax, FOR THE WIN
  // I've been making this typo for years, it's finally valid syntax :)
  createDb() {
    MongoClient.connect(this.url+this.db, function(err, db) {
      if (err) throw err;
      console.log("Database created!");
      db.close();
    });
  }

  createCollection(collectionName) {
    MongoClient.connect(this.url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(this.db);
      dbo.createCollection(collectionName, function(err, res) {
        if (err) throw err;
        console.log("Collection "+collectionName+" created!");
        db.close();
      });
    });
  }

  insert(collectionName, document) {
    MongoClient.connect(this.url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(this.db);
      dbo.collection(collectionName).insertOne(document, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    });
  }

  query(query, collectionName, callback) {
    MongoClient.connect(this.url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(this.db);
      //var query = { address: "Park Lane 38" };
      dbo.collection(collectionName).find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        callback(err, result);
        db.close();
      });
    });
  }
}
exports.MongoManager = MongoManager;
