//import
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const port = 2000;
const fileUpload = require("express-fileupload");

//midleware
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

//mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tfzr2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

//router
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome",
  });
});

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const sildeCollection = client.db("slide").collection("image");
  console.log("database connect");
  app.post("/name", (req, res) => {
    const name = req.body;
    sildeCollection
      .insertOne(name)
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

//server
app.listen(process.env.PORT || port, () => {
  console.log("server is running");
});
