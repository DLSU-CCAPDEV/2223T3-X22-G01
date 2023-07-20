// import mongoose from "mongoose";
// import User from "../models/UserModel.js";
// import Post from "../models/PostModel.js";
// import Comment from "../models/CommentModel.js";

const mongoose = require('mongoose');
const mongodb = require('mongodb');
const dotenv = require(`dotenv`);

dotenv.config();
// Connect to MONGODB_URI, which also includes the database name
const url = process.env.MONGODB_URI;
const client = mongodb.MongoClient;

const dbName = 'salamindb';
const options = { useUnifiedTopology: true };

const database = {

  /*
      creates database
  */
  createDatabase: function() {
      client.connect(url, options, function (err, db) {
          if(err) throw err;
          console.log('Database created!');
          db.close();
      });
  },

  /*
      creates collection `collection`
  */
  createCollection: function(collection) {
      client.connect(url, options, function(err, db) {
          if(err) throw err;
          var database = db.db(dbName);
          database.createCollection(collection, function (err, res) {
              if(err) throw err;
              console.log('Collection ' + collection + ' created');
              db.close();
          });
      });
  },

  /*
      inserts document `doc` to collection `collection`
  */
  insertOne: function(collection, doc) {
      client.connect(url, options, function (err, db) {
          if(err) throw err;
          var database = db.db(dbName);
          database.collection(collection).insertOne(doc, function (err, res) {
              if(err) throw err;
              console.log('1 document inserted');
              db.close();
          });
      });
  },

  /*
      inserts array of documents `docs` to collection `collection`
  */
  insertMany: function(collection, docs) {
      client.connect(url, options, function (err, db) {
          if(err) throw err;
          var database = db.db(dbName);
          database.collection(collection).insertMany(docs, function (err, res) {
              if(err) throw err;
              console.log('Documents inserted: ' + res.insertedCount);
              db.close();
          });
      });
  },

  /*
      searches for a single document in the collection `collection`
      based on the contents of object `query`
      callback function is called
      when the database has finished the execution of findOne() function
  */
  findOne: function(collection, query, callback) {
      client.connect(url, options, function (err, db) {
          if(err) throw err;
          var database = db.db(dbName);
          database.collection(collection).findOne(query, function (err, result) {
              if(err) throw err;
              db.close();
              return callback(result);
          });
      });
  },

  /*
      searches for multiple documents in the collection `collection`
      based on the contents of object `query`
      callback function is called
      when the database has finished the execution of findMany() function
  */
  findMany: function(collection, query, sort=null, projection=null, callback) {
      client.connect(url, options, function (err, db) {
          if(err) throw err;
          var database = db.db(dbName);
          database.collection(collection).find(query, {projection: projection})
          .sort(sort).toArray(function (err, result) {
              if(err) throw err;
              db.close();
              return callback(result);
          });
      });
  },

  /*
      deletes a single document in the collection `collection`
      based on the object `filter`
  */
  deleteOne: function(collection, filter) {
      client.connect(url, options, function (err, db) {
          if(err) throw err;
          var database = db.db(dbName);
          database.collection(collection).deleteOne(filter, function (err, res) {
              if(err) throw err;
              console.log('1 document deleted');
              db.close();
          });
      });
  },

  /*
      deletes multiple documents in the collection `collection`
      based on the object `filter`
  */
  deleteMany: function(collection, filter) {
      client.connect(url, options, function (err, db) {
          if(err) throw err;
          var database = db.db(dbName);
          database.collection(collection).deleteMany(filter, function(err, res) {
              if(err) throw err;
              console.log('Documents deleted: ' + res.deletedCount);
              db.close();
          });
      });
  },

  /*
      drops the collection `collection`
  */
  dropCollection: function(collection) {
      client.connect(url, options, function (err, db) {
          if(err) throw err;
          var database = db.db(dbName);
          database.collection(collection).drop(function (err, res) {
              if(err) throw err;
              console.log('Collection ' + collection + ' deleted');
              db.close();
          });
      });
  },

  /*
      updates the value defined in the object `update`
      on a single document in the collection `collection`
      based on the object `filter`
  */
  updateOne: function(collection, filter, update) {
      client.connect(url, options, function (err, db) {
          if(err) throw err;
          var database = db.db(dbName);
          database.collection(collection).updateOne(filter, update, function (err, res) {
              if(err) throw err;
              console.log('1 document updated');
              db.close();
          });
      });
  },

  /*
      updates the value defined in the object `update`
      on multiple documents in the collection `collection`
      based on the object `filter`
  */
  updateMany: function(collection, filter, update) {
      client.connect(url, options, function (err, db) {
          if(err) throw err;
          var database = db.db(dbName);
          database.collection(collection).updateMany(filter, update, function (err, res) {
              if(err) throw err;
              console.log('Documents updated: ' + res.modifiedCount);
              db.close();
          });
      });
  },

  connect: async () => {
    try {
        await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.error(err);
    }
  }
}

module.exports = database;