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
  return path.resolve(__dirname, "./skilfullai/dist/", `${page}.html`);
};

mongoose
  .connect("mongodb+srv://arman:12345@cluster0.a7eewrn.mongodb.net/test")
  .then(() => {
    console.log("conected to db");
  })
  .catch((err) => {
    console.log("error");
  });

app.listen(3000, (err) => {
  err ? console.log(err) : console.log("listening 3000 port");
});

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(createPath("index"));
});



app.get('/',(req,res)=>{
	const title = 'Posts'
	Post.find()
	.sort({createdAt: -1})
	.then((posts)=>res.send(posts))

})



