const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Post = require("./models/post");

app.use(express.static("./skilfullai/dist/styles"));
app.use(express.static("./skilfullai/dist/images"));
app.use(express.static("./skilfullai/dist/js"));
app.use(methodOverride("_method"));

const createPath = (page) => {
  return path.resolve(__dirname, "./skilfullai/dist/ejs", `${page}.ejs`);
};

app.listen(3000, (err) => {
  err ? console.log(err) : console.log("listening 3000 port");
});

app.use(express.urlencoded({ extended: false }));

app.set("view xengine", "ejs");

let data;

const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = "mongodb+srv://arman:12345@cluster0.a7eewrn.mongodb.net/test";

// Database Name
const dbName = "node-blog";

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function (err) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  // Get the documents collection
  const collection = db.collection("contacts");

  // Find some documents
  collection.find({}).toArray(function (err, docs) {
    if (err) {
      console.log(err);
      client.close();
      return;
    }

    console.log("Found the following records");
    console.log(docs);
    data = docs;
    client.close();
  });
});

app.get("/", (req, res) => {
  res.render(createPath("index"), {data});
});
